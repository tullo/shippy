SHELL = /bin/bash -o pipefail
export SVC=shippy-service-user

build: export CGO_ENABLED=0
build: export GOOS=linux
build:
	go build -o shippy-service-user -mod mod -trimpath

docker-image: export DOCKER_BUILDKIT=1
docker-image:
	@docker build -f dockerfile -t ${SVC} .

docker-run:
	@docker run -p 50051:50051 ${SVC}

grcp:
	@echo '~ protoc OK'
	@protoc --proto_path=. --go_out=. --micro_out=. proto/user.proto

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

tidy:
	go mod tidy
