package main

import (
	"context"
	"errors"
	"log"

	"github.com/micro/micro/v3/service"
	"github.com/micro/micro/v3/service/logger"
	proto "github.com/tullo/shippy/shippy-service-vessel/proto"
)

// Repository ...
type Repository interface {
	FindAvailable(*proto.Specification) (*proto.Vessel, error)
}

// VesselRepository ...
type VesselRepository struct {
	vessels []*proto.Vessel
}

// FindAvailable - checks a specification against a map of vessels, if capacity
// and max weight are below a vessels capacity and max weight, then return that
// vessel.
func (repo *VesselRepository) FindAvailable(spec *proto.Specification) (*proto.Vessel, error) {
	for _, vessel := range repo.vessels {
		if spec.Capacity <= vessel.Capacity && spec.MaxWeight <= vessel.MaxWeight {
			return vessel, nil
		}
	}
	return nil, errors.New("No vessel found by that spec")
}

// gRPC service handler
type vesselService struct {
	repo Repository
}

func (s *vesselService) FindAvailable(ctx context.Context, req *proto.Specification, res *proto.Response) error {

	// Find the next available vessel
	vessel, err := s.repo.FindAvailable(req)
	if err != nil {
		return err
	}

	// Set the vessel as part of the response message type
	res.Vessel = vessel
	return nil
}

func main() {
	vessels := []*proto.Vessel{
		{
			Id:        "vessel001",
			Capacity:  500,
			MaxWeight: 200000,
			Name:      "Boaty McBoatface",
			Available: false,
			OwnerId:   "",
		},
	}
	repo := &VesselRepository{vessels}

	srv := service.New(
		service.Name("shippy.service.vessel"),
	)
	srv.Init()

	if err := proto.RegisterVesselServiceHandler(srv.Server(), &vesselService{repo}); err != nil {
		log.Panic(err)
	}

	if err := srv.Run(); err != nil {
		logger.Fatal(err)
	}
}
