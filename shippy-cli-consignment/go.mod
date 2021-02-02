module github.com/tullo/shippy/shippy-cli-consignment

go 1.15

// replace github.com/tullo/shippy/shippy-service-consignment => ../shippy-service-consignment

require (
	github.com/micro/micro/v3 v3.0.4
	github.com/tullo/shippy/shippy-service-consignment v0.0.0-20210202115315-f9d2bafce1bd
)
