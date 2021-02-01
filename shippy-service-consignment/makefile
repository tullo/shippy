SHELL = /bin/bash -o pipefail
docker-image: export DOCKER_BUILDKIT = 1
docker-image:
	@docker build -f dockerfile -t shippy-service-consignment .

docker-run:
	@docker run -p 50051:50051 shippy-service-consignment

grcp:
	@echo '~ protoc OK'
	@protoc --proto_path=. --go_out=. --micro_out=. proto/consignment.proto

micro-log:
	@micro logs -f shippy-service-consignment

micro-kill:
	@micro kill shippy-service-consignment
	@micro status

micro-run:
	@micro run .

micro-update:
	@micro update .
	@micro logs -f shippy-service-consignment

micro-status:
	@micro status
