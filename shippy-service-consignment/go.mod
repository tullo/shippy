module github.com/tullo/shippy/shippy-service-consignment

go 1.15

// replace github.com/tullo/shippy/shippy-service-vessel => ../shippy-service-vessel

require (
	github.com/golang/protobuf v1.4.3
	github.com/micro/micro/v3 v3.0.4
	github.com/pkg/errors v0.9.1
	github.com/tullo/shippy/shippy-service-vessel v0.0.0-20210202211142-f05e75d37452
	go.mongodb.org/mongo-driver v1.4.5
	google.golang.org/protobuf v1.25.0
)
