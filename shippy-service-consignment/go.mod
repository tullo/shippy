module github.com/tullo/shippy/shippy-service-consignment

go 1.15

// replace github.com/tullo/shippy/shippy-service-vessel => ../shippy-service-vessel

require (
	github.com/golang/protobuf v1.4.3
	github.com/micro/micro/v3 v3.0.4
	github.com/pkg/errors v0.9.1
	github.com/tullo/shippy/shippy-service-user v0.0.0-20210203141101-b2aa444aca5c
	github.com/tullo/shippy/shippy-service-vessel v0.0.0-20210203141101-b2aa444aca5c
	go.mongodb.org/mongo-driver v1.4.6
	google.golang.org/protobuf v1.25.0
)
