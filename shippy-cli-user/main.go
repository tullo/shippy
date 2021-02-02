package main

import (
	"context"
	"errors"
	"fmt"

	"github.com/micro/micro/v3/service"
	proto "github.com/tullo/shippy/shippy-service-user/proto"
)

func createUser(ctx context.Context, srv *service.Service, user *proto.User) error {
	client := proto.NewUserService("shippy.service.user", srv.Client())
	rsp, err := client.Create(ctx, user)
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

	// test call debug
	req := srv.Client().NewRequest("kljkljlk", "Debug.Health",
		new(proto.User),
	)

	rsp := new(proto.HealthResponse)

	err := c.Call(context.TODO(), req, rsp)
	if err != nil {
		return err
	}

	if rsp.Status != "ok" {
		return errors.New("service response: " + rsp.Status)
	}

	createUser(context.Background(), srv, nil)
}
