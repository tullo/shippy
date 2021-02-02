package main

import (
	"context"

	"github.com/pkg/errors"
	proto "github.com/tullo/shippy/shippy-service-consignment/proto"
	vesselProto "github.com/tullo/shippy/shippy-service-vessel/proto"
)

type handler struct {
	repository
	vesselClient vesselProto.VesselService
}

// CreateConsignment ...
func (s *handler) CreateConsignment(ctx context.Context, req *proto.Consignment, res *proto.Response) error {
	// Filter vessel by max weight and cap.
	spec := vesselProto.Specification{
		MaxWeight: req.Weight,
		Capacity:  int32(len(req.Containers)),
	}
	vesselResponse, err := s.vesselClient.FindAvailable(ctx, &spec)
	if vesselResponse == nil {
		return errors.New("error fetching vessel, returned nil")
	}

	if err != nil {
		return err
	}

	// We set the VesselId as the vessel we got back from our
	// vessel service
	req.VesselId = vesselResponse.Vessel.Id

	// Save our consignment
	if err = s.repository.Create(ctx, MarshalConsignment(req)); err != nil {
		return err
	}

	res.Created = true
	res.Consignment = req
	return nil
}

// GetConsignments retrives all consignments from the datastore.
func (s *handler) GetConsignments(ctx context.Context, req *proto.GetRequest, res *proto.Response) error {
	consignments, err := s.repository.GetAll(ctx)
	if err != nil {
		return err
	}
	res.Consignments = UnmarshalConsignmentCollection(consignments)
	return nil
}
