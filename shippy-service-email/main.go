package main

import (
	"fmt"

	"github.com/micro/micro/v3/service"
	"github.com/micro/micro/v3/service/events"
	"github.com/micro/micro/v3/service/logger"
	proto "github.com/tullo/shippy/shippy-service-user/proto"
)

const topic = "user.created"

// Process sends emails to created users.
func process() error {
	evStream, err := events.Consume(topic)
	if err != nil {
		logger.Errorf(fmt.Sprintf("error streaming events: topic: %v. error: %v", topic, err))
		return err
	}

	for {
		select {
		case ev := <-evStream:
			// Recieved a message.
			// Unmarshal it into a message struct.
			// If an error occurs log it.
			var u proto.User
			if err := ev.Unmarshal(&u); err != nil {
				logger.Errorf(fmt.Sprintf("error unmarshaling message. topic:%v. error:%v", topic, err))
				return err
			}

			logger.Infof(fmt.Sprintf("Picked up a new message: ID:%s", ev.ID))
			logger.Infof(fmt.Sprintf("Sending email to:%s", u.Name))
		}
	}
}

func main() {
	srv := service.New(service.Name("shippy.service.email"))
	srv.Init()

	done := make(chan error, 2)
	go func() {
		done <- process()
	}()

	go func() {
		if err := srv.Run(); err != nil {
			done <- err
		}
	}()

	for i := 0; i < cap(done); i++ {
		if err := <-done; err != nil {
			logger.Errorf(fmt.Sprintf("error: %v", err))
		}
	}
}
