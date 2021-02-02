package main

import (
	"context"

	proto "github.com/tullo/shippy/shippy-service-consignment/proto"
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
func MarshalContainer(container *proto.Container) *Container {
	return &Container{
		ID:         container.Id,
		CustomerID: container.CustomerId,
		UserID:     container.UserId,
	}
}

// UnmarshalContainer ...
func UnmarshalContainer(container *Container) *proto.Container {
	return &proto.Container{
		Id:         container.ID,
		CustomerId: container.CustomerID,
		UserId:     container.UserID,
	}
}

// MarshalConsignment an input consignment type to a consignment model
func MarshalConsignment(consignment *proto.Consignment) *Consignment {
	containers := MarshalContainerCollection(consignment.Containers)
	return &Consignment{
		ID:          consignment.Id,
		Weight:      consignment.Weight,
		Description: consignment.Description,
		Containers:  containers,
		VesselID:    consignment.VesselId,
	}
}

// UnmarshalConsignment ...
func UnmarshalConsignment(consignment *Consignment) *proto.Consignment {
	return &proto.Consignment{
		Id:          consignment.ID,
		Weight:      consignment.Weight,
		Description: consignment.Description,
		Containers:  UnmarshalContainerCollection(consignment.Containers),
		VesselId:    consignment.VesselID,
	}
}

// MarshalContainerCollection ...
func MarshalContainerCollection(containers []*proto.Container) []*Container {
	collection := make([]*Container, 0)
	for _, container := range containers {
		collection = append(collection, MarshalContainer(container))
	}
	return collection
}

// UnmarshalContainerCollection ...
func UnmarshalContainerCollection(containers []*Container) []*proto.Container {
	collection := make([]*proto.Container, 0)
	for _, container := range containers {
		collection = append(collection, UnmarshalContainer(container))
	}
	return collection
}

// UnmarshalConsignmentCollection ...
func UnmarshalConsignmentCollection(consignments []*Consignment) []*proto.Consignment {
	collection := make([]*proto.Consignment, 0)
	for _, consignment := range consignments {
		collection = append(collection, UnmarshalConsignment(consignment))
	}
	return collection
}

type repository interface {
	Create(ctx context.Context, consignment *Consignment) error
	GetAll(ctx context.Context) ([]*Consignment, error)
}

// MongoRepository implementation
type MongoRepository struct {
	collection *mongo.Collection
}

// Create a new consignment.
func (repository *MongoRepository) Create(ctx context.Context, consignment *Consignment) error {
	_, err := repository.collection.InsertOne(ctx, consignment)
	return err
}

// GetAll consignments.
func (repository *MongoRepository) GetAll(ctx context.Context) ([]*Consignment, error) {
	cur, err := repository.collection.Find(ctx, nil, nil)
	var consignments []*Consignment
	for cur.Next(ctx) {
		var consignment *Consignment
		if err := cur.Decode(&consignment); err != nil {
			return nil, err
		}
		consignments = append(consignments, consignment)
	}
	return consignments, err
}
