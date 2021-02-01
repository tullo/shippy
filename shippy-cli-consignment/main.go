package main

import (
	"context"
	"encoding/json"
	"log"

	"github.com/micro/micro/v3/service"
	pb "github.com/tullo/shippy/shippy-service-consignment/proto/consignment"
)

const address = "localhost:50051"

var payload = `{
	"description": "This is a test consignment",
	"weight": 55000,
	"containers": [
	  { "customer_id": "cust001", "user_id": "user001", "origin": "Manchester, United Kingdom" },
	  { "customer_id": "cust002", "user_id": "user001", "origin": "Derby, United Kingdom" },
	  { "customer_id": "cust005", "user_id": "user001", "origin": "Sheffield, United Kingdom" }
	]
  }  
`

func parsePayload() (*pb.Consignment, error) {
	var consignment *pb.Consignment
	err := json.Unmarshal([]byte(payload), &consignment)
	return consignment, err
}

func main() {
	// create and initialise a new service
	srv := service.New()
	srv.Init()

	client := pb.NewShippingService("shippy.service.consignment", srv.Client())

	// Contact the server and print out its response.
	consignment, err := parsePayload()
	if err != nil {
		log.Fatalf("Could not parse payload: %v", err)
	}

	r, err := client.CreateConsignment(context.Background(), consignment)
	if err != nil {
		log.Fatalf("Could not greet: %v", err)
	}
	log.Printf("Created: %t", r.Created)

	var get pb.GetRequest
	getAll, err := client.GetConsignments(context.Background(), &get)
	if err != nil {
		log.Fatalf("Could not list consignments: %v", err)
	}
	for _, v := range getAll.Consignments {
		log.Println(v)
	}
}
