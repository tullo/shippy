SHELL = /bin/bash -o pipefail

.DEFAULT_GOAL := micro-server

datastore-up:
	docker-compose up -d datastore

micro-server: datastore-up
	@micro server

micro-login: micro-server
	@micro login

protoc-gen-go:
	@cd && GO111MODULE=on go get github.com/golang/protobuf/protoc-gen-go@v1.4.3
	@echo "OK"

protoc-gen-micro:
	@cd && GO111MODULE=on go get -v github.com/micro/micro/v3/cmd/protoc-gen-micro@master
	@echo "OK"
