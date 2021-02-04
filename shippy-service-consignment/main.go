package main

import (
	"context"
	"log"

	"github.com/micro/micro/v3/service"
	"github.com/micro/micro/v3/service/client"
	"github.com/micro/micro/v3/service/config"
	"github.com/micro/micro/v3/service/context/metadata"
	"github.com/micro/micro/v3/service/logger"
	"github.com/micro/micro/v3/service/server"
	"github.com/pkg/errors"
	proto "github.com/tullo/shippy/shippy-service-consignment/proto"
	userProto "github.com/tullo/shippy/shippy-service-user/proto"
	vesselProto "github.com/tullo/shippy/shippy-service-vessel/proto"
)

var authDisabled bool

func main() {
	srv := service.New(
		service.Name("shippy.service.consignment"),
		service.WrapHandler(AuthWrapper),
	)

	srv.Init()

	authDisabled = confBool("auth.disable")
	uri := confString("db.host")

	client, err := CreateClient(context.Background(), uri, 0)
	if err != nil {
		log.Panic(err)
	}
	defer client.Disconnect(context.Background())

	consignmentCollection := client.Database("shippy").Collection("consignments")
	repository := &MongoRepository{consignmentCollection}
	vesselClient := vesselProto.NewVesselService("shippy.service.vessel", srv.Client())
	h := &handler{repository, vesselClient}

	// Register handlers
	if err := proto.RegisterShippingServiceHandler(srv.Server(), h); err != nil {
		log.Panic(err)
	}

	// Run the service
	if err := srv.Run(); err != nil {
		logger.Fatal(err)
	}
}

// AuthWrapper is a high-order function which takes a HandlerFunc and returns a
// function, which takes a context, request and response interface.
// The token is extracted from the context set in our consignment-cli, that
// token is then sent over to the user service to be validated.
// If valid, the call is passed along to the handler.
// If not, an error is returned.
func AuthWrapper(fn server.HandlerFunc) server.HandlerFunc {
	return func(ctx context.Context, req server.Request, rsp interface{}) error {
		if authDisabled {
			return fn(ctx, req, rsp)
		}
		logger.Info("===== WRAPPER =====")

		meta, ok := metadata.FromContext(ctx)
		if !ok {
			return errors.New("no auth meta-data found in request")
		}
		token := meta["Token"]
		log.Println("Authenticating with token: ", token)

		// Auth here
		authClient := userProto.NewUserService("shippy.service.user", client.DefaultClient)
		if _, err := authClient.ValidateToken(context.Background(),
			&userProto.Token{Token: token}); err != nil {
			return err
		}

		return fn(ctx, req, rsp)
	}
}

func confString(key string) string {
	logger.Infof("loading config: %s", key)
	cf, err := config.Get(key)
	if err != nil {
		logger.Errorf("Error loading config: %v", err.Error())
		return ""
	}

	val := cf.String("")
	if len(val) == 0 {
		logger.Errorf("Missing required config: %v", key)
		return ""
	}
	logger.Infof("%v: %v", key, val)

	return val
}

func confBool(cfg string) bool {
	logger.Infof("loading config: %s", cfg)
	cf, err := config.Get(cfg)
	if err != nil {
		logger.Errorf("Error loading config: %v", err)
		return false
	}

	val := cf.Bool(true)
	logger.Infof("%v: %v", cfg, val)

	return val
}
