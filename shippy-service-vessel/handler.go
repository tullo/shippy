package main

import (
	"context"

	proto "github.com/tullo/shippy/shippy-service-vessel/proto"
)

// gRPC service handler
type handler struct {
	repository
}

// FindAvailable vessels
func (s *handler) FindAvailable(ctx context.Context, req *proto.Specification, res *proto.Response) error {

	// Find the next available vessel
	vessel, err := s.repository.FindAvailable(ctx, MarshalSpecification(req))
	if err != nil {
		return err
	}

	// Set the vessel as part of the response message type
	res.Vessel = UnmarshalVessel(vessel)
	return nil
}

// Create a new vessel
func (s *handler) Create(ctx context.Context, req *proto.Vessel, res *proto.Response) error {
	if err := s.repository.Create(ctx, MarshalVessel(req)); err != nil {
		return err
	}
	res.Vessel = req
	return nil
}
