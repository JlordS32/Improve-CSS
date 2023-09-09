// 1. Setting Data

// Parse the query parameter 'name' from the URL
const urlParams = new URLSearchParams(window.location.search);
const countryId = urlParams.get('name');

// Attempt to retrieve country data from local storage
const storedCountryData = JSON.parse(localStorage.getItem('countries'));

// Redirect to a 'countrynotfound.html' page if 'name' parameter is missing
if (!countryId) {
	window.location.href = '/countrynotfound.html';
}

// 2. Functions

// Concatenate an array of native country names into a comma-separated string
function concatenateNativeNames(countryItem) {
	let parsedItem = '';
	countryItem.forEach((value, index) => {
		parsedItem += value.official;
		if (index < nativeName.length - 1) {
			parsedItem += ', ';
		}
	});
	return parsedItem;
}

// Concatenate an array of languages into a comma-separated string
function concatenateLanguages(language) {
	let parsedItem = '';
	language.forEach((value, index) => {
		parsedItem += value;
		if (index < language.length - 1) {
			parsedItem += ', ';
		}
	});
	return parsedItem;
}

// 3. Targeting Elements

const countryImg = document.querySelector('.selected-country img');
const countryName = document.querySelector('.selected-country h1');
const nativeNameElement = document.querySelector('.native-name span');
const populationElement = document.querySelector('.population span');
const regionElement = document.querySelector('.region span');
const subRegionElement = document.querySelector('.sub-region span');
const capitalElement = document.querySelector('.capital span');
const languageElement = document.querySelector('.languages span');
const borderCountriesParent = document.querySelector('.border-countries');

// 4. Getting the Data from the Array

// Filter the stored data to find the selected country
const selectedCountry = storedCountryData.filter(
	(country) => country.name.common.toLowerCase() === countryId
);
const backBtn = document.querySelector('.back-btn');

// Extract properties from the selected country object
const {
	name,
	flags,
	region,
	population,
	subregion,
	capital,
	tld,
	currencies,
	borders,
} = selectedCountry[0];

// Extract native names and languages into arrays
const nativeName = Object.entries(name.nativeName).map((entry) => entry[1]);
const language = Object.values(selectedCountry[0].languages);

// Filter the countries that share borders with the selected country
const borderCountries = storedCountryData.filter((country) => borders?.includes(country.cca3));

// Extract the names of bordering countries
const borderCountryNames = borderCountries.map((country) => country.name.common);

// 5. DOM Manipulation

// Set the country's flag image source
countryImg.setAttribute('src', flags.png);

// Update HTML elements with extracted data
countryName.textContent = name.common;
nativeNameElement.textContent = concatenateNativeNames(nativeName);
populationElement.textContent = population;
regionElement.textContent = region;
subRegionElement.textContent = subregion;
capitalElement.textContent = capital;
languageElement.textContent = concatenateLanguages(language);

// Create and append div elements for bordering countries
borderCountryNames.forEach((countryName) => {
	const borderCountryChild = document.createElement('div');
	borderCountryChild.classList.add('border-country');
	borderCountryChild.textContent = countryName;
	borderCountriesParent.appendChild(borderCountryChild);
});

backBtn.addEventListener('click', () => {
   window.location.href = 'index.html';
})