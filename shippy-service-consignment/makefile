SHELL = /bin/bash -o pipefail
docker-image: export DOCKER_BUILDKIT = 1
docker-image:
	@docker build -f dockerfile -t shippy-service-consignment .

docker-run:
	@docker run -p 50051:50051 shippy-service-consignment

grcp:
	@echo '~ protoc OK'
	@protoc -I. --go_out=plugins=grpc:. proto/consignment/consignment.proto

protoc-gen-go:
	@cd && GO111MODULE=on go get github.com/golang/protobuf/protoc-gen-go@v1.4.3
	@echo "OK"
