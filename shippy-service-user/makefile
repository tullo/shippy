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
	--name 'John Doe' --company "CPH Shippers" --email 'john.doe@cph.com' --password 's3cr3t'

micro-user-getAll:
	@micro shippy.service.user userService getAll

micro-user-get:
	@micro shippy.service.user userService get --id 54ecf63d-fc45-44d8-9a0d-6039ab3fd5fa

# id must be part of user claims for token validation.
micro-user-auth:
	@micro shippy.service.user userService auth \
	--email 'john.doe@cph.com' --password 's3cr3t' \
	--id '9585c6bb-ced6-4a19-b5f7-e186dea0e23b'

micro-user-validateToken:
	@micro shippy.service.user userService validateToken \
	--token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiOTU4NWM2YmItY2VkNi00YTE5LWI1ZjctZTE4NmRlYTBlMjNiIiwiZW1haWwiOiJqb2huLmRvZUBjcGguY29tIiwicGFzc3dvcmQiOiJzM2NyM3QifSwiZXhwIjoxNjEyNDc5NzU0LCJpYXQiOjE2MTI0NzYxNTQsImlzcyI6InNoaXBweS5zZXJ2aWNlLnVzZXIifQ.H_S3zGsqz3xN5B6pkbmO3b6kY8VmbD1JZfSxbbAbi5w"

micro-store-list:
	micro store list

micro-store-read:
	micro store read user.created/ffa39464-0cb0-4a3d-a69d-7fc2bd48a40b

curl-user-create:
	@curl -H "Content-Type:application/json" \
	-d '{"name": "Foo Bar","company": "Baz","email": "foo.bar@baz.com","password" : "s3cr3t"}' \
	http://localhost:8080/shippy.service.user/userService/create

curl-user-auth:
	@curl -H "Content-Type:application/json" \
	-d '{"email": "foo.bar@baz.com","password" : "s3cr3t", "id": "0e7a2ffa-8bc7-4a9c-a95b-580490e3eca2"}' \
	http://localhost:8080/shippy.service.user/userService/auth
