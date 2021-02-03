module github.com/tullo/shippy/shippy-service-consignment

go 1.15

// replace github.com/tullo/shippy/shippy-service-vessel => ../shippy-service-vessel

require (
	github.com/aws/aws-sdk-go v1.37.2 // indirect
	github.com/golang/protobuf v1.4.3
	github.com/micro/micro/v3 v3.0.4
	github.com/pkg/errors v0.9.1
	github.com/tullo/shippy/shippy-service-user v0.0.0-20210202235746-d4c5b64169aa
	github.com/tullo/shippy/shippy-service-vessel v0.0.0-20210202235746-d4c5b64169aa
	github.com/ulikunitz/xz v0.5.10 // indirect
	go.mongodb.org/mongo-driver v1.4.6
	google.golang.org/genproto v0.0.0-20210202153253-cf70463f6119 // indirect
	google.golang.org/protobuf v1.25.0
)
