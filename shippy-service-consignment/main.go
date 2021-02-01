package main

import (
	"context"
	"log"
	"sync"

	"github.com/micro/micro/v3/service"
	"github.com/micro/micro/v3/service/logger"
	pb "github.com/tullo/shippy/shippy-service-consignment/proto/consignment"
)

type repository interface {
	Create(*pb.Consignment) (*pb.Consignment, error)
	GetAll() []*pb.Consignment
}

// Repository simulates the use of a datastore of some kind.
type Repository struct {
	mu           sync.RWMutex
	consignments []*pb.Consignment
}

// Create a new consignment.
func (repo *Repository) Create(consignment *pb.Consignment) (*pb.Consignment, error) {
	repo.mu.Lock()
	updated := append(repo.consignments, consignment)
	repo.consignments = updated
	repo.mu.Unlock()
	return consignment, nil
}

// GetAll consignments.
func (repo *Repository) GetAll() []*pb.Consignment {
	return repo.consignments
}

type consignmentService struct {
	repo repository
}

// CreateConsignment takes a context, consignment request and a response.
func (s *consignmentService) CreateConsignment(ctx context.Context, req *pb.Consignment, res *pb.Response) error {
	consignment, err := s.repo.Create(req)
	if err != nil {
		return err
	}
	res.Created = true
	res.Consignment = consignment

	return nil
}

// GetConsignments retrives all consignments from the datastore.
func (s *consignmentService) GetConsignments(ctx context.Context, req *pb.GetRequest, res *pb.Response) error {
	consignments := s.repo.GetAll()
	res.Consignments = consignments

	return nil
}

func main() {
	srv := service.New(
		service.Name("shippy.service.consignment"),
	)
	srv.Init()

	var repo Repository
	var cs consignmentService
	cs.repo = &repo
	if err := pb.RegisterShippingServiceHandler(srv.Server(), &cs); err != nil {
		log.Panic(err)
	}

	// Run the service
	if err := srv.Run(); err != nil {
		logger.Fatal(err)
	}
}
