import "./style.css";
import "./leaflet.css";
import { UpdateLocation } from "../wailsjs/go/main/App";

function setTheme() {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
}

setTheme();
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", setTheme);

// Inject HTML layout
document.querySelector("#app").innerHTML = `
  <div id="overlay">
    <div id="info-card">
      <h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wifi-icon lucide-wifi">
            <path d="M12 20h.01"/>
            <path d="M2 8.82a15 15 0 0 1 20 0"/>
            <path d="M5 12.859a10 10 0 0 1 14 0"/>
            <path d="M8.5 16.429a5 5 0 0 1 7 0"/>
        </svg>
        Location Information
      </h2>
      <div id="info-grid">Loading...</div>
    </div>
  </div>

  <div id="map"></div>

  <div id="bottom-bar">
    <button id="refresh">
      <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 6V4l-4 4 4 4V8c2.76 0 5 2.24 5 5a5.002 5.002 0 01-9.9 1H5.08a7.002 7.002 0 0013.83-1c0-3.87-3.13-7-7-7z"/>
      </svg>
      Refresh Location
    </button>
  </div>
`;


const map = L.map("map", {
  zoomControl: false,
  attributionControl: false
}).setView([0, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

let marker;

function updateInfoCard(data) {
  const coordsLink = `https://maps.google.com/?q=${data.Lat},${data.Lon}`;
  document.getElementById("info-grid").innerHTML = `
    <div><span>IP Address</span>${data.IP}</div>
    <div><span>City</span>${data.City}</div>
    <div><span>Region</span>${data.Region}</div>
    <div><span>Country</span>${data.Country}</div>
    <div><span>Timezone</span>${data.Timezone}</div>
    <div><span>ISP</span>${data.ISP}</div>
    <div>
        <span>Coordinates</span>
        <a href="#" onclick="window.runtime.BrowserOpenURL('${coordsLink}')">${data.Lat}, ${data.Lon}</a>
    </div>
  `;
}

function updateLocation() {
  UpdateLocation().then((data) => {
    console.log("Location data:", data);
    if (marker) map.removeLayer(marker);
    marker = L.marker([data.Lat, data.Lon])
      .addTo(map)
      .bindPopup(`${data.City}, ${data.Region}<br>${data.Country}<br>${data.IP}`)
      .openPopup();
    map.setView([data.Lat, data.Lon], 13);
    updateInfoCard(data);
  }).catch(console.error);
}

document.getElementById("refresh").addEventListener("click", updateLocation);
window.onload = updateLocation;
