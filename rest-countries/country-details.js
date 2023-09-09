// Setting Data
const urlParams = new URLSearchParams(window.location.search);
const countryId = urlParams.get('name');
const storedCountryData = JSON.parse(localStorage.getItem('countries'));

if (!countryId) {
	window.location.href = '/countrynotfound.html';
}

// Functions
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

// Targeting elements
const countryImg = document.querySelector('.selected-country img');
const countryName = document.querySelector('.selected-country h1');
const nativeNameElement = document.querySelector('.native-name span');
const populationElement = document.querySelector('.population span');
const regionElement = document.querySelector('.region span');
const subRegionElement = document.querySelector('.sub-region span');
const capitalElement = document.querySelector('.capital span');

// Getting the data from the array
const selectedCountry = storedCountryData.filter(
	(country) => country.name.common.toLowerCase() === countryId
);
console.log('Selected Country', selectedCountry);

const { name, flags, region, population, subregion, capital, tld, currencies, borders} =
	selectedCountry[0];

const nativeName = Object.entries(name.nativeName).map((entry) => {
	const [key, value] = entry;
	return value;
});
const language = Object.entries(selectedCountry[0].languages).map((entry) => {
	const [key, value] = entry;
	return value;
});
console.log('Language', borders?);

const parsedNativeName = concatenateNativeNames(nativeName);
const parsedLanguage = concatenateLanguages(language);

console.log(parsedNativeName);
console.log(parsedLanguage);

countryImg.setAttribute('src', flags.png);
