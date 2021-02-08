package main

import (
	"context"

	"github.com/micro/micro/v3/service/logger"
	"github.com/pkg/errors"
	"github.com/rs/xid"
	proto "github.com/tullo/shippy/shippy-service-consignment/proto"
	vesselProto "github.com/tullo/shippy/shippy-service-vessel/proto"
)

var (
	// ErrVesselNotFound is used when a specific Vessel is requested but does not exist.
	ErrVesselNotFound = errors.New("vessel not found")
)

type handler struct {
	r repository
	v vesselProto.VesselService
}

// CreateConsignment ...
func (h *handler) CreateConsignment(ctx context.Context, req *proto.Consignment, res *proto.Response) error {
	// Find vessel using max-weight and cap.
	spec := vesselProto.Specification{
		MaxWeight: req.Weight,
		Capacity:  int32(len(req.Containers)),
	}
	ves, err := h.v.FindAvailable(ctx, &spec)
	if err != nil {
		return errors.Wrap(err, "error finding available vessel")
	}

	if ves.Vessel == nil {
		logger.Errorf("vessel not found: filter {%s}", spec.String())
		return ErrVesselNotFound
	}

	// Update with VesselId we got back from vessel service.
	req.VesselId = ves.Vessel.Id
	guid := xid.New()
	req.Id = guid.String()

	// Save consignment.
	if err = h.r.Create(ctx, MarshalConsignment(req)); err != nil {
		return errors.Wrap(err, "creating consignment")
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
		return errors.Wrap(err, "retrieving consignments")
	}
	res.Consignments = UnmarshalConsignmentCollection(c)

	return nil
}
