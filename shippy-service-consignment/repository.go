package main

import (
	"context"

	"github.com/micro/micro/v3/service/logger"
	proto "github.com/tullo/shippy/shippy-service-consignment/proto"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// Consignment ...
type Consignment struct {
	ID          string     `json:"id"`
	Weight      int32      `json:"weight"`
	Description string     `json:"description"`
	Containers  Containers `json:"containers"`
	VesselID    string     `json:"vessel_id"`
}

// Container ...
type Container struct {
	ID         string `json:"id"`
	CustomerID string `json:"customer_id"`
	UserID     string `json:"user_id"`
}

// Containers ...
type Containers []*Container

// MarshalContainer ...
func MarshalContainer(c *proto.Container) *Container {
	return &Container{
		ID:         c.Id,
		CustomerID: c.CustomerId,
		UserID:     c.UserId,
	}
}

// UnmarshalContainer ...
func UnmarshalContainer(c *Container) *proto.Container {
	return &proto.Container{
		Id:         c.ID,
		CustomerId: c.CustomerID,
		UserId:     c.UserID,
	}
}

// MarshalConsignment an input consignment type to a consignment model
func MarshalConsignment(c *proto.Consignment) *Consignment {
	return &Consignment{
		ID:          c.Id,
		Weight:      c.Weight,
		Description: c.Description,
		Containers:  MarshalContainerCollection(c.Containers),
		VesselID:    c.VesselId,
	}
}

// UnmarshalConsignment ...
func UnmarshalConsignment(c *Consignment) *proto.Consignment {
	return &proto.Consignment{
		Id:          c.ID,
		Weight:      c.Weight,
		Description: c.Description,
		Containers:  UnmarshalContainerCollection(c.Containers),
		VesselId:    c.VesselID,
	}
}

// MarshalContainerCollection ...
func MarshalContainerCollection(cs []*proto.Container) []*Container {
	collection := make([]*Container, 0)
	for _, c := range cs {
		collection = append(collection, MarshalContainer(c))
	}
	return collection
}

// UnmarshalContainerCollection ...
func UnmarshalContainerCollection(collection []*Container) []*proto.Container {
	cs := make([]*proto.Container, 0)
	for _, c := range collection {
		cs = append(cs, UnmarshalContainer(c))
	}
	return cs
}

// UnmarshalConsignmentCollection ...
func UnmarshalConsignmentCollection(collection []*Consignment) []*proto.Consignment {
	cs := make([]*proto.Consignment, 0)
	for _, c := range collection {
		cs = append(cs, UnmarshalConsignment(c))
	}
	return cs
}

type repository interface {
	Create(ctx context.Context, c *Consignment) error
	GetAll(ctx context.Context) ([]*Consignment, error)
}

// MongoRepository implementation
type MongoRepository struct {
	collection *mongo.Collection
}

// Create a new consignment.
func (r *MongoRepository) Create(ctx context.Context, c *Consignment) error {
	_, err := r.collection.InsertOne(ctx, c)
	return err
}

// GetAll consignments.
func (r *MongoRepository) GetAll(ctx context.Context) ([]*Consignment, error) {
	var cs []*Consignment
	cur, err := r.collection.Find(ctx, bson.D{})
	if err != nil {
		return cs, err
	}
	if cur == nil {
		return cs, nil
	}
	for cur.Next(ctx) {
		var c *Consignment
		if err := cur.Decode(&c); err != nil {
			return cs, err
		}
		cs = append(cs, c)
	}
	logger.Infof("found (%v) consignments", len(cs))

	return cs, nil
}
