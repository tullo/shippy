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
# ================= VESSEL OPS ============================================== #
# =========================================================================== #

micro-help:
	@micro shippy.service.vessel --help

# InsertOne ...
micro-vessel-create:
	@micro shippy.service.vessel vesselService create \
	--name 'vessel35' --capacity 300 --max_weight 500 --available true

# FindOne ...
micro-vessel-findAvailable:
	@micro shippy.service.vessel vesselService \
		findAvailable --capacity 300 --max_weight 500

# InsertOne ...
curl-vessel-create:
	@curl -H "Content-Type:application/json" \
	-d '{"name": "Vessel CPH", "capacity": 3, "max_weight": 55000, "available" : true}' \
	http://localhost:8080/shippy.service.vessel/vesselService/create

# FindOne ...
curl-vessel-findAvailable:
	@curl -H "Content-Type:application/json" \
	-d '{"capacity": 3, "max_weight": 55000}' \
	http://localhost:8080/shippy.service.vessel/vesselService/findAvailable
