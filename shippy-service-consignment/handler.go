package main

import (
	"context"

	"github.com/micro/micro/v3/service/logger"
	"github.com/pkg/errors"
	proto "github.com/tullo/shippy/shippy-service-consignment/proto"
	vesselProto "github.com/tullo/shippy/shippy-service-vessel/proto"
)

type handler struct {
	r repository
	v vesselProto.VesselService
}

// CreateConsignment ...
func (h *handler) CreateConsignment(ctx context.Context, req *proto.Consignment, res *proto.Response) error {
	// Filter vessel by max weight and cap.
	spec := vesselProto.Specification{
		MaxWeight: req.Weight,
		Capacity:  int32(len(req.Containers)),
	}
	ves, err := h.v.FindAvailable(ctx, &spec)
	if ves == nil {
		return errors.New("error fetching vessel, returned nil")
	}

	if err != nil {
		return err
	}

	// We set the VesselId as the vessel we got back from our
	// vessel service
	req.VesselId = ves.Vessel.Id

	// Save consignment
	if err = h.r.Create(ctx, MarshalConsignment(req)); err != nil {
		return err
	}

	res.Created = true
	res.Consignment = req

	return nil
}

// GetConsignments retrives all consignments from the datastore.
func (h *handler) GetConsignments(ctx context.Context, req *proto.GetRequest, res *proto.Response) error {
	c, err := h.r.GetAll(ctx)
	if err != nil {
		logger.Error(err.Error())
	}
	res.Consignments = UnmarshalConsignmentCollection(c)

	return nil
}
