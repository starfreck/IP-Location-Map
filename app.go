package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// UpdateLocation fetches the public IP address and retrieves the location information
// based on that IP. It returns a LocationResult containing the IP, city, latitude, and longitude.
func (a *App) UpdateLocation() (*LocationResult, error) {
	// Step 1: Get public IP
	resp, err := http.Get("https://api.ipify.org/?format=json")
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var ipInfo IPInfo
	if err := json.NewDecoder(resp.Body).Decode(&ipInfo); err != nil {
		return nil, err
	}

	// Step 2: Get location data
	locResp, err := http.Get("https://go-web-proxy.onrender.com/json/" + ipInfo.IP)
	if err != nil {
		return nil, err
	}
	defer locResp.Body.Close()

	var locData LocationInfo
	if err := json.NewDecoder(locResp.Body).Decode(&locData); err != nil {
		return nil, err
	}

	// Step 3: Return result
	result := &LocationResult{
		IP:       ipInfo.IP,
		City:     locData.City,
		Region:   locData.RegionName,
		Country:  locData.Country,
		Lat:      locData.Lat,
		Lon:      locData.Lon,
		Timezone: locData.Timezone,
		ISP:      locData.ISP,
		Message:  fmt.Sprintf("IP: %s, City: %s", ipInfo.IP, locData.City),
	}

	return result, nil
}
