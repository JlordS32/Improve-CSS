const fetchUserIP = async () => {
	try {
		const response = await fetch(`https://ipinfo.io/?token=5a5c1c4b1b1a0c`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

const fetchUserDefaultLocation = async () => {
	try {
		const defaultIP = await fetchUserIP();
		const response = await fetch(
			`https://geo.ipify.org/api/v2/country,city?apiKey=at_MpxawKCaHCWQFHjwKbNDjNvZrqUwR&ipAddress=${defaultIP.ip}`
		);
		const data = await response.json();

		return data;
	} catch (error) {
		console.error(error);
	}
};

const userLocation = await fetchUserDefaultLocation();

const { lat, lng } = userLocation.location;

var map = L.map('map').setView([lat, lng], 13);

L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
	maxZoom: 20,
	subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);

document.addEventListener('DOMContentLoaded', () => {
	fetchUserDefaultLocation();
});
