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
const fetchUserDefaultLocation = async (ipaddress) => {
	try {
		// Get the user's default IP address
		const defaultIP = await fetchUserIP();

		// Fetch location information using the IP address from ipify.org
		const response = await fetch(
			`https://geo.ipify.org/api/v2/country,city?apiKey=at_MpxawKCaHCWQFHjwKbNDjNvZrqUwR&ipAddress=${defaultIP.ip}`
		);
		const data = await response.json();

		return data;
	} catch (error) {
		console.error(error);
	}
};

const fetchUserLocation = async (ipaddress) => {
	try {
		// Fetch location information using the IP address from ipify.org
		const response = await fetch(
			`https://geo.ipify.org/api/v2/country,city?apiKey=at_MpxawKCaHCWQFHjwKbNDjNvZrqUwR&ipAddress=${ipaddress}`
		);
		const data = await response.json();

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
L.marker([lat, lng]).addTo(map);

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
timezoneOutputElement.textContent = `UTC ${data.location.timezone}`;

// Display ISP
ispOutputElement.textContent = data.isp;

const searchIPAddress = document.querySelector('.search-location input');
const submitSearch = document.querySelector('.submit');

const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

const searchContainer = document.querySelector('.search-location');
submitSearch.addEventListener('click', async () => {
	if (ipRegex.test(searchIPAddress.value)) {
		searchContainer.style.transition = '0ms';
		searchContainer.style.outline = '0';
		
		loadDisplay(ipOutputElement, ipAddressElement);
		loadDisplay(locationOutputElement, locationElement);
		loadDisplay(timezoneOutputElement, timezoneElement);
		loadDisplay(ispOutputElement, ispElement);

		const userLocation = await fetchUserLocation(searchIPAddress.value);

		// Extract latitude and longitude from userLocation
		const { lat, lng, city, country, geonameId, timezone } =
			userLocation.location;
		const parsedLocation = [city, country, geonameId].join(', ');

		console.log(lat, lng);

		// Create a Leaflet map
		map.setView([lat, lng], 13);
		L.marker([lat, lng]).addTo(map);

		// Display IP address
		ipOutputElement.textContent = userLocation.ip;

		// Display parsed location
		locationOutputElement.textContent = parsedLocation;

		// Display timezone
		timezoneOutputElement.textContent = `UTC ${timezone}`;

		// Display ISP
		ispOutputElement.textContent = userLocation.isp;
	} else {
		searchContainer.style.transition = '0ms';
		searchContainer.style.outline = '2px solid red';
	}
});

// Function to update the placeholder based on screen width
const updatePlaceholder = () => {
	if (window.innerWidth < 768) {
		searchIPAddress.placeholder = 'Search IP Location';
	}
 }
 
 // Initial call to set the placeholder based on the current screen width
 updatePlaceholder();
 
 // Add an event listener for the window resize event
 window.addEventListener('resize', updatePlaceholder);