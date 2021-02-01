module github.com/tullo/shippy/shippy-cli-consignment

go 1.15

replace github.com/tullo/shippy/shippy-service-consignment => ../shippy-service-consignment

require (
	github.com/tullo/shippy/shippy-service-consignment v0.0.0-00010101000000-000000000000
	google.golang.org/grpc v1.35.0
)
