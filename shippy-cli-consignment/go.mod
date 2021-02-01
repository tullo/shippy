module github.com/tullo/shippy/shippy-cli-consignment

go 1.15

replace github.com/tullo/shippy/shippy-service-consignment => ../shippy-service-consignment

require (
	github.com/micro/micro/v3 v3.0.4
	github.com/tullo/shippy/shippy-service-consignment v0.0.0-00010101000000-000000000000
)
