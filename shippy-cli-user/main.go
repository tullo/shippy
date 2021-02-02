package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/micro/micro/v3/service"
	proto "github.com/tullo/shippy/shippy-service-user/proto"
)

func createUser(ctx context.Context, srv *service.Service) error {
	client := proto.NewUserService("shippy.service.user", srv.Client())
	rsp, err := client.Create(ctx, &proto.User{
		Name:     "A User",
		Email:    "one@example.com",
		Company:  "Google",
		Password: "s3cr3t",
	})
	if err != nil {
		return err
	}

	fmt.Println("Response: ", rsp.User)

	return nil
}

func createUser2(ctx context.Context, srv *service.Service) error {
	req := srv.Client().NewRequest("shippy.service.user", "UserService.Create", &proto.User{
		Name:     "Another User",
		Email:    "two@example.com",
		Company:  "Amazon",
		Password: "s3cr3t",
	})
	rsp := new(proto.Response)
	err := srv.Client().Call(ctx, req, rsp)
	if err != nil {
		return err
	}

	fmt.Println("Response: ", rsp.User)

	return nil
}

func main() {
	// Create a new service. Optionally include some options here.
	srv := service.New(
		service.Name("shippy.service.user"),
	)
	srv.Init()

	createUser(context.Background(), srv)
	createUser2(context.Background(), srv)

	client := proto.NewUserService("shippy.service.user", srv.Client())

	getAll, err := client.GetAll(context.Background(), &proto.Request{})
	if err != nil {
		log.Fatalf("Could not list users: %v", err)
	}

	for _, v := range getAll.Users {
		log.Println(v)
	}

	authResponse, err := client.Auth(context.TODO(), &proto.User{
		Email:    "two@example.com",
		Password: "s3cr3t",
	})
	if err != nil {
		log.Fatalf("Could not authenticate user: %s error: %v\n", "two@example.com", err)
	}

	log.Printf("Your access token is: %s \n", authResponse.Token)

	os.Exit(0)
}
