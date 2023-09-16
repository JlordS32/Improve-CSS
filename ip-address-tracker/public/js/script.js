// Function to fetch the user's IP address using ipinfo.io
const fetchUserIP = async () => {
	try {
		const response = await fetch(`https://ipinfo.io/?token=5a5c1c4b1b1a0c`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

// Function to fetch the user's default location based on their IP address
const fetchUserDefaultLocation = async () => {
	try {
		// Get the user's default IP address
		const defaultIP = await fetchUserIP();

		// Fetch location information using the IP address from ipify.org
		const response = await fetch(
			`https://geo.ipify.org/api/v2/country,city?apiKey=at_MpxawKCaHCWQFHjwKbNDjNvZrqUwR&ipAddress=${defaultIP.ip}`
		);
		const data = await response.json();

		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
	}
};

const loadDisplay = (child, parent) => {
	child.classList.add('output');
	child.textContent = 'Loading...';
	parent.appendChild(child);
};

// Fetch the user's default location information
const userLocation = await fetchUserDefaultLocation();

// Extract latitude and longitude from userLocation
const { lat, lng } = userLocation.location;

// Create a Leaflet map
var map = L.map('map').setView([lat, lng], 13);

// Add a tile layer to the map (Google Maps style)
L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
	maxZoom: 20,
	subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);

// Select elements in the HTML for displaying information
const ipAddressElement = document.querySelector('.ip-address');
const locationElement = document.querySelector('.location');
const timezoneElement = document.querySelector('.timezone');
const ispElement = document.querySelector('.isp');

// Create child elements for displaying information
const ipOutputElement = document.createElement('div');
const locationOutputElement = document.createElement('div');
const timezoneOutputElement = document.createElement('div');
const ispOutputElement = document.createElement('div');

loadDisplay(ipOutputElement, ipAddressElement);
loadDisplay(locationOutputElement, locationElement);
loadDisplay(timezoneOutputElement, timezoneElement);
loadDisplay(ispOutputElement, ispElement);

// Fetch user location data again (not needed, already fetched)
const data = await fetchUserDefaultLocation();

// Extract city, country, and geonameId from location data and join them
const { city, country, geonameId } = data.location;
const parsedLocation = [city, country, geonameId].join(', ');

// Display IP address
ipOutputElement.textContent = data.ip;

// Display parsed location
locationOutputElement.textContent = parsedLocation;

// Display timezone
timezoneOutputElement.textContent = data.location.timezone;

// Display ISP
ispOutputElement.textContent = data.isp;
