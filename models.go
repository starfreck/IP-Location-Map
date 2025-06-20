package main

type IPInfo struct {
	IP string `json:"ip"`
}

type LocationInfo struct {
	Status      string  `json:"status"`
	Country     string  `json:"country"`
	CountryCode string  `json:"countryCode"`
	Region      string  `json:"region"`
	RegionName  string  `json:"regionName"`
	City        string  `json:"city"`
	Zip         string  `json:"zip"`
	Lat         float64 `json:"lat"`
	Lon         float64 `json:"lon"`
	Timezone    string  `json:"timezone"`
	ISP         string  `json:"isp"`
	Org         string  `json:"org"`
	AS          string  `json:"as"`
	Query       string  `json:"query"`
}

type LocationResult struct {
	IP       string
	City     string
	Region   string
	Country  string
	Lat      float64
	Lon      float64
	Timezone string
	ISP      string
	Message  string
}
