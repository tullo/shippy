package main

import (
	"context"

	"github.com/micro/micro/v3/service/logger"
	proto "github.com/tullo/shippy/shippy-service-vessel/proto"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type repository interface {
	FindAvailable(ctx context.Context, spec *Specification) (*Vessel, error)
	Create(ctx context.Context, vessel *Vessel) error
}

type MongoRepository struct {
	collection *mongo.Collection
}

type Specification struct {
	Capacity  int32
	MaxWeight int32
}

func MarshalSpecification(spec *proto.Specification) *Specification {
	return &Specification{
		Capacity:  spec.Capacity,
		MaxWeight: spec.MaxWeight,
	}
}

func UnmarshalSpecification(spec *Specification) *proto.Specification {
	return &proto.Specification{
		Capacity:  spec.Capacity,
		MaxWeight: spec.MaxWeight,
	}
}

func MarshalVessel(vessel *proto.Vessel) *Vessel {
	return &Vessel{
		ID:        vessel.Id,
		Capacity:  vessel.Capacity,
		MaxWeight: vessel.MaxWeight,
		Name:      vessel.Name,
		Available: vessel.Available,
		OwnerID:   vessel.OwnerId,
	}
}

func UnmarshalVessel(vessel *Vessel) *proto.Vessel {
	return &proto.Vessel{
		Id:        vessel.ID,
		Capacity:  vessel.Capacity,
		MaxWeight: vessel.MaxWeight,
		Name:      vessel.Name,
		Available: vessel.Available,
		OwnerId:   vessel.OwnerID,
	}
}

type Vessel struct {
	ID        string
	Capacity  int32
	Name      string
	Available bool
	OwnerID   string
	MaxWeight int32
}

// FindAvailable - checks a specification against a map of vessels,
// if capacity and max weight are below a vessels capacity and max weight,
// then return that vessel.
func (r *MongoRepository) FindAvailable(ctx context.Context, spec *Specification) (*Vessel, error) {
	logger.Infof("FindOne %+v", spec)

	filter := bson.D{
		{
			Key:   "capacity",
			Value: bson.D{{Key: "$lte", Value: spec.Capacity}}},
		{
			Key:   "maxweight",
			Value: bson.D{{Key: "$lte", Value: spec.MaxWeight}},
		},
	}

	var v Vessel
	if err := r.collection.FindOne(ctx, filter).Decode(&v); err != nil {
		return nil, err
	}

	return &v, nil
}

// Create a new vessel
func (r *MongoRepository) Create(ctx context.Context, vessel *Vessel) error {
	_, err := r.collection.InsertOne(ctx, vessel)

	return err
}
