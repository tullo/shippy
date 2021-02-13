# Shippy

This project implements a couple of `Go` microservices using [micro](https://micro.mu/) - a platform for cloud native development.

The current implementation is based on `micro version v3.0.4`

The services interact using `gRPC` and protocolbuffers or by dispatching and consuming events.

The microservices are stitched together as a single API in a `React` frontend that talks to the micro server API.

## Available Goals

In the project directory, you can run:

### `make database-up`

Starts the `Postgres` service with an empty database.

### `make datastore-up`

Starts the `MongoDB` service with an empty datastore.

### `make micro-server`

Starts Micro in server mode.

### `make micro-login`

Runs the login sequence to enable interaction with the micro server.

### `make micro-conf`

Sets a couple of config keys recuired by registered microservices.

### `make micro-run`

Is the make goal that builds and registers the individual microservices on the micro server.

----

## Credits

[Ewan Valentine](https://ewanvalentine.io/)
