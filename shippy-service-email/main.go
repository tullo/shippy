package main

import (
	"context"
	"log"

	"github.com/micro/micro/v3/service"
	"github.com/micro/micro/v3/service/logger"
	proto "github.com/tullo/shippy/shippy-service-user/proto"
)

const topic = "user.created"

// Process sends emails to created users.
func Process(ctx context.Context, user *proto.User) error {
	log.Println("Picked up a new message")
	log.Println("Sending email to:", user.Name)

	return nil
}

func main() {
	srv := service.New(service.Name("shippy.service.email"))
	srv.Init()

	// subscribe to the topic
	service.Subscribe(topic, Process)
	if err := srv.Run(); err != nil {
		logger.Fatal(err)
	}
}
