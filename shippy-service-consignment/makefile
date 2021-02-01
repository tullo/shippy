SHELL = /bin/bash -o pipefail
grcp:
	@echo '~ protoc OK'
	protoc -I. --go_out=plugins=grpc:. proto/consignment/consignment.proto

protoc-gen-go:
	@cd && GO111MODULE=on go get github.com/golang/protobuf/protoc-gen-go@v1.4.3
	@echo "OK"
