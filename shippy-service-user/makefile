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
	@go mod tidy

# =========================================================================== #
# ================= USER OPS ================================================ #
# =========================================================================== #

micro-help:
	@micro shippy.service.user --help

micro-user-create:
	@micro shippy.service.user userService create \
	--name 'John Doe' --company "CPH Shippers" --email "john.doe@cph.com" --password "s3cr3t"

micro-user-getAll:
	@micro shippy.service.user userService getAll

micro-user-get:
	@micro shippy.service.user userService get --id 54ecf63d-fc45-44d8-9a0d-6039ab3fd5fa

micro-user-auth:
	@micro shippy.service.user userService auth \
	--email 'john.doe@cph.com' --password 's3cr3t' --id '3b85cc3e-8ede-4d96-9bf6-540b15dbe67a'

curl-user-create:
	@curl -H "Content-Type:application/json" \
	-d '{"name": "Foo Bar","company": "Baz","email": "foo.bar@baz.com","password" : "s3cr3t"}' \
	http://localhost:8080/shippy.service.user/userService/create

micro-user-validateToken:
	@micro shippy.service.user userService validateToken \
	--token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiM2I4NWNjM2UtOGVkZS00ZDk2LTliZjYtNTQwYjE1ZGJlNjdhIiwiZW1haWwiOiJqb2huLmRvZUBjcGguY29tIiwicGFzc3dvcmQiOiJzM2NyM3QifSwiZXhwIjoxNjEyMzYyMjUwLCJpYXQiOjE2MTIzNTg2NTAsImlzcyI6InNoaXBweS5zZXJ2aWNlLnVzZXIifQ.sSwmfZXx0E-MEcOgSSvI_EVBGUly1ENagtpLYSCa4HQ"
