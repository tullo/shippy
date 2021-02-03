SHELL = /bin/bash -o pipefail
export SVC=shippy-service-email

micro-kill:
	@micro kill ${SVC}
	@micro status

micro-log:
	@micro logs -f ${SVC}

micro-run:
	@micro run .

micro-update:
	@micro update .
	@micro logs -f ${SVC}

micro-status:
	@micro status

tidy:
	@go mod tidy
