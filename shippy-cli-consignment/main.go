package main

import (
	"context"
	"encoding/json"
	"log"

	"github.com/micro/micro/v3/service"
	"github.com/micro/micro/v3/service/context/metadata"
	proto "github.com/tullo/shippy/shippy-service-consignment/proto"
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

func parsePayload() (*proto.Consignment, error) {
	var consignment *proto.Consignment
	err := json.Unmarshal([]byte(payload), &consignment)
	return consignment, err
}

func main() {
	// create and initialise a new service
	srv := service.New()
	srv.Init()

	client := proto.NewShippingService("shippy.service.consignment", srv.Client())

	// Contact the server and print out its response.
	consignment, err := parsePayload()
	if err != nil {
		log.Fatalf("Could not parse payload: %v", err)
	}

	// Create a new context which contains our given token.
	ctx := metadata.NewContext(context.Background(), map[string]string{
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiM2I4NWNjM2UtOGVkZS00ZDk2LTliZjYtNTQwYjE1ZGJlNjdhIiwiZW1haWwiOiJqb2huLmRvZUBjcGguY29tIiwicGFzc3dvcmQiOiJzM2NyM3QifSwiZXhwIjoxNjEyMzYyMjUwLCJpYXQiOjE2MTIzNTg2NTAsImlzcyI6InNoaXBweS5zZXJ2aWNlLnVzZXIifQ.sSwmfZXx0E-MEcOgSSvI_EVBGUly1ENagtpLYSCa4HQ",
	})

	r, err := client.CreateConsignment(ctx, consignment)
	if err != nil {
		log.Fatalf("Could not greet: %v", err)
	}
	log.Printf("Created: %t", r.Created)

	var get proto.GetRequest
	getAll, err := client.GetConsignments(ctx, &get)
	if err != nil {
		log.Fatalf("Could not list consignments: %v", err)
	}
	for _, v := range getAll.Consignments {
		log.Println(v)
	}
}
