package main

import (
	"context"
	"log"

	"github.com/micro/micro/v3/service"
	"github.com/micro/micro/v3/service/config"
	"github.com/micro/micro/v3/service/logger"
	proto "github.com/tullo/shippy/shippy-service-vessel/proto"
)

// Repository ...
type Repository interface {
	FindAvailable(*proto.Specification) (*proto.Vessel, error)
}

func main() {
	srv := service.New(
		service.Name("shippy.service.vessel"),
	)
	srv.Init()

	val, err := config.Get("db.host")
	if err != nil {
		logger.Errorf("Error loading config: %v", err)
	}
	uri := val.String("")

	client, err := CreateClient(context.Background(), uri, 0)
	if err != nil {
		log.Panic(err)
	}
	defer client.Disconnect(context.Background())

	vesselCollection := client.Database("shippy").Collection("vessels")
	repository := &MongoRepository{vesselCollection}

	h := &handler{repository}

	if err := proto.RegisterVesselServiceHandler(srv.Server(), h); err != nil {
		log.Panic(err)
	}

	if err := srv.Run(); err != nil {
		logger.Fatal(err)
	}
}
