SHELL=/bin/bash -euo pipefail

.DEFAULT_GOAL := start

# https://reactjs.org/
# https://create-react-app.dev/docs/deployment/

start:
	npm start

# homepage field in package.json
.PHONY: build
build:
	npm run build

.PHONY: test
test:
	npm run test

# which serve 
# ~.nvm/versions/node/v14.15.4/bin/serve
.PHONY: serve
serve:
	npx serve --listen tcp://:3000 --single build

.PHONY: upgrade
upgrade:
	npm install react-scripts@latest

.PHONY: certs
certs: dotfile=.env
certs:
	@mkdir -p tls/localhost
	$$(go env GOPATH)/bin/mkcert \
		-cert-file ./tls/localhost/cert.pem \
		-key-file ./tls/localhost/key.pem \
		localhost 127.0.0.1 ::1
	@echo "HTTPS=true" > ${dotfile}
	@echo "SSL_CRT_FILE=tls/localhost/cert.pem" >> ${dotfile}
	@echo "SSL_KEY_FILE=tls/localhost/key.pem" >> ${dotfile}
	@echo "Created ${dotfile} file."

# https://react-bootstrap.github.io/
.PHONY: add-bootstrap
add-bootstrap:
	npm install --save react-bootstrap bootstrap
