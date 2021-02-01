SHELL = /bin/bash -o pipefail
export SVC=shippy-service-vessel

docker-image: export DOCKER_BUILDKIT = 1
docker-image:
	@docker build -f dockerfile -t ${SVC} .

docker-run:
	@docker run -p 50051:50051 ${SVC}

grcp:
	@echo '~ protoc OK'
	@protoc --proto_path=. --go_out=. --micro_out=. proto/vessel.proto

protoc-gen-go:
	@cd && GO111MODULE=on go get github.com/golang/protobuf/protoc-gen-go@v1.4.3
	@echo "OK"

protoc-gen-micro:
	@cd && GO111MODULE=on go get -v github.com/micro/micro/v3/cmd/protoc-gen-micro@master
	@echo "OK"

micro-log:
	@micro logs -f ${SVC}

micro-kill:
	@micro kill ${SVC}
	@micro status

micro-run:
	@micro run .

micro-update:
	@micro update .
	@micro logs -f ${SVC}

micro-status:
	@micro status
