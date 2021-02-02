package main

import (
	"log"

	"github.com/micro/micro/v3/service"
	"github.com/micro/micro/v3/service/logger"
	proto "github.com/tullo/shippy/shippy-service-user/proto"
)

const schema = `
	create table if not exists users (
		id varchar(36) not null,
		name varchar(125) not null,
		email varchar(225) not null unique,
		password varchar(225) not null,
		company varchar(125),
		primary key (id)
	);
`

func main() {
	// Create a new service. Optionally include some options here.
	srv := service.New(service.Name("shippy.service.user"))
	srv.Init()

	// Creates a database connection and handles
	// closing it again before exit.
	db, err := NewConnection()
	if err != nil {
		log.Panic(err)
	}
	defer db.Close()

	if err != nil {
		log.Fatalf("Could not connect to DB: %v", err)
	}
	// Run schema query on start-up, as we're using "create if not exists"
	// this will only be ran once. In order to create updates, you'll need to
	// use a migrations library.
	db.MustExec(schema)

	repo := NewPostgresRepository(db)
	tokenService := &TokenService{repo}
	// Register handler
	if err := proto.RegisterUserServiceHandler(srv.Server(), &handler{repo, tokenService}); err != nil {
		log.Panic(err)
	}

	// Run the server
	if err := srv.Run(); err != nil {
		logger.Fatal(err)
	}
}
