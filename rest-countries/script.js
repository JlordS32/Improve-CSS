const axios = require('axios');
axios.get('https://restcountries.com/v3.1/all').then((response) => {
	const countries = response.data;

	const countryData = {};

	countries.forEach((country) => {
		countryData[country.name.common] = country;
	});

	const countryList = document.querySelector('#countryList ul');

	for (const countryName in countryData) {
		const country = countryData[countryName];
		const listItem = createCountryListItem(country);
		countryList.appendChild(listItem);
	}
});
