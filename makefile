SHELL = /bin/bash -o pipefail

.DEFAULT_GOAL := micro-server

database-up:
	docker-compose up -d database
	docker-compose logs -f database

datastore-up:
	docker-compose up -d datastore

micro-conf: export MIP=$(shell docker container inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' datastore)
micro-conf: export PIP=$(shell docker container inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' database)
micro-conf:
	micro config set db.host 'mongodb://${MIP}:27017'
	micro config get db
	micro config set pg.host '${PIP}'
	micro config set pg.dbName 'postgres'
	micro config set pg.user 'admin'
	micro config set pg.password 'password'
	micro config get pg
	micro config set disable_auth 'false'
	micro config get disable_auth

micro-conf-auth-disable:
	micro config set disable_auth 'true'
	micro config get disable_auth

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

# =========================================================================== #
# ================= SHIPPY UI =============================================== #
# =========================================================================== #

install-nvm:
	wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

install-npx:
	nvm install --lts

shippy-ui:
	npx create-react-app shippy-ui
	cd shippy-ui; dotrun
	git add shippy-ui/
