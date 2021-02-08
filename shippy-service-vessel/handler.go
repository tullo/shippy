package main

import (
	"context"

	"github.com/micro/micro/v3/service/logger"
	"github.com/pkg/errors"
	"github.com/rs/xid"
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
		logger.Error(err)
		return errors.Wrap(err, "finding available vessel")
	}

	// Set the vessel as part of the response message type
	res.Vessel = UnmarshalVessel(vessel)

	return nil
}

// Create a new vessel
func (s *handler) Create(ctx context.Context, req *proto.Vessel, res *proto.Response) error {
	guid := xid.New()
	req.Id = guid.String()
	if err := s.repository.Create(ctx, MarshalVessel(req)); err != nil {
		return errors.Wrap(err, "persisting vessel")
	}
	res.Vessel = req
	return nil
}
