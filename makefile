SHELL = /bin/bash -o pipefail

.DEFAULT_GOAL := micro-server

micro-server:
	@micro server

micro-login: micro-server
	@micro login

protoc-gen-go:
	@cd && GO111MODULE=on go get github.com/golang/protobuf/protoc-gen-go@v1.4.3
	@echo "OK"

protoc-gen-micro:
	@cd && GO111MODULE=on go get -v github.com/micro/micro/v3/cmd/protoc-gen-micro@master
	@echo "OK"
