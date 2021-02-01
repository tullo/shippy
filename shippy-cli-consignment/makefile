SHELL = /bin/bash -o pipefail
export SVC=shippy-cli-consignment

docker-image: export DOCKER_BUILDKIT = 1
docker-image:
	@docker build -f dockerfile -t ${SVC} .

docker-run:
	@docker run -p 50051:50051 ${SVC}

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
