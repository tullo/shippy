package main

import (
	"context"
	"log"

	"github.com/micro/micro/v3/service"
	"github.com/micro/micro/v3/service/config"
	"github.com/micro/micro/v3/service/logger"
	proto "github.com/tullo/shippy/shippy-service-consignment/proto"
	vesselProto "github.com/tullo/shippy/shippy-service-vessel/proto"
)

const (
	defaultHost = "datastore:27017"
)

func main() {
	srv := service.New(
		service.Name("shippy.service.consignment"),
	)

	srv.Init()

	val, err := config.Get("db.host")
	if err != nil {
		logger.Fatalf("Error loading config: %v", err)
	}
	uri := val.String("")

	client, err := CreateClient(context.Background(), uri, 0)
	if err != nil {
		log.Panic(err)
	}
	defer client.Disconnect(context.Background())

	consignmentCollection := client.Database("shippy").Collection("consignments")
	repository := &MongoRepository{consignmentCollection}
	vesselClient := vesselProto.NewVesselService("shippy.service.client", srv.Client())
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
