document.addEventListener('DOMContentLoaded', () => {
	const url = 'https://restcountries.com/v3.1/all';

	let cachedData;
	let filteredData;

	const getCountries = async () => {
		if (cachedData) {
			diplayCountries(cachedData);
		} else {
			const response = await fetch(url);
			const data = await response.json();

			cachedData = data;

			diplayCountries(data);
			localStorage.setItem('countries', JSON.stringify(cachedData));
		}
	};

	const diplayCountries = (data) => {
		const sortedData = data.sort((a, b) =>
			a.name.common.localeCompare(b.name.common)
		);
		sortedData.forEach((country) => {
			// Create a new element and assign value
			const newCountry = document.createElement('div');
			newCountry.classList.add('country-box');

			// Setting image for country
			const countryImgContainer = document.createElement('div');
			countryImgContainer.classList.add('img-container');
			countryImgContainer.style.backgroundImage = `url(${country.flags.png})`;

			// Setting name for country
			const countryName = document.createElement('h1');
			countryName.textContent = country.name.common;

			// Creating another child component to store details;
			const countryDetails = document.createElement('div');
			countryDetails.classList.add('country-box-details');

			const population = document.createElement('p');
			const region = document.createElement('p');
			const capital = document.createElement('p');

			// Stoing details for countryDetails
			population.innerHTML = `<span>Population</span>: ${country.population}`;
			region.innerHTML = `<span>Region</span>: ${country.region}`;

			if (country && country.capital) {
				capital.innerHTML = `<span>Capital</span>: ${country.capital[0]}`;
			} else {
				capital.innerHTML = `<span>Capital</span>: No Capital`;
			}

			//Populating CountryDetails
			countryDetails.appendChild(population);
			countryDetails.appendChild(region);
			countryDetails.appendChild(capital);

			// Populating the parentElement newCountry
			newCountry.appendChild(countryImgContainer);
			newCountry.appendChild(countryName);
			newCountry.appendChild(countryDetails);

			// Append new element to parent element
			const countryContainer = document.querySelector('#countryList');
			countryContainer?.appendChild(newCountry);

			newCountry.addEventListener('click', () => {
				window.location.href = `./country-details.html?name=${country.name.common.toLowerCase()}`;
			});
		});
	};

	const toggleMode = () => {
		const rootElement = document.querySelector(':root');

		const colors = {
			white: 'hsl(0, 0%, 100%)',
			dark: {
				darkBlue: 'hsl(209, 23%, 22%)',
				veryDarkBlue: 'hsl(207, 26%, 17%)',
			},
			light: {
				darkGray: 'hsl(0, 0%, 52%)',
				veryDarkBlue: 'hsl(200, 15%, 8%)',
				veryLightGray: 'hsl(0, 0%, 98%)',
			},
		};
		const toggleMode = document.querySelector('.toggle-mode');
		const mode = document.querySelector('.toggle-mode span');
		const modeImg = document.querySelector('.toggle-mode img');

		// Get the initial isDarkMode value from localStorage
		let localDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));

		// Set the initial text and image based on localDarkMode
		mode.textContent = localDarkMode ? 'Light Mode' : 'Dark Mode';
		modeImg.setAttribute(
			'src',
			localDarkMode ? 'assets/img/sun.svg' : 'assets/img/moon.svg'
		);

		function switchToDarkMode() {
			mode.textContent = 'Light Mode';
			modeImg.setAttribute('src', 'assets/img/sun.svg');

			// Setting Colours for dark mode
			rootElement.style.setProperty('--accent', colors.dark.darkBlue);
			rootElement.style.setProperty('--bg', colors.dark.veryDarkBlue);
			rootElement.style.setProperty('--text-color', colors.white);
		}

		function switchToLightMode() {
			mode.textContent = 'Dark Mode';
			modeImg.setAttribute('src', 'assets/img/moon.svg');

			// Setting Colours for light mode
			rootElement.style.setProperty('--accent', colors.white);
			rootElement.style.setProperty('--bg', colors.light.veryLightGray);
			rootElement.style.setProperty('--text-color', colors.light.veryDarkBlue);
		}

		if (localDarkMode) {
			switchToLightMode();
		} else {
			switchToDarkMode();
		}

		toggleMode.addEventListener('click', () => {
			if (localDarkMode) {
				switchToDarkMode();

				// Update localDarkMode and localStorage
				localStorage.setItem('isDarkMode', false);
				localDarkMode = false; // Update the local variable
			} else {
				switchToLightMode();

				// Update localDarkMode and localStorage
				localStorage.setItem('isDarkMode', true);
				localDarkMode = true; // Update the local variable
			}
		});
	};

	const inputElement = document.getElementById('country-input');
	let inputValue = '';

	inputElement?.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			// Update inputValue with the current input value when Enter is pressed
			inputValue = inputElement.value;

			if (inputValue === '') {
				// Clear the existing country list when the input is empty
				const countryContainer = document.querySelector('#countryList');
				countryContainer.innerHTML = ''; // Remove all child elements

				// Display the cached data
				diplayCountries(cachedData);
				return;
			}

			const countries = JSON.parse(localStorage.getItem('countries'));

			const query = countries.filter((country) =>
				country.name.common.toLowerCase().includes(inputValue.toLowerCase())
			);
			filteredData = query;

			const countryContainer = document.querySelector('#countryList');
			countryContainer.innerHTML = '';
			// Display the filtered data
			diplayCountries(filteredData);
		}
	});

	const selectElement = document.querySelector('#country-filter-select');
	selectElement?.addEventListener('change', (e) => {
		const countries = JSON.parse(localStorage.getItem('countries'));
		const selectedRegion = e.target.value.toLowerCase();

		const query = countries.filter((country) => {
			if (selectedRegion === 'all') {
				return country;
			}

			return country.region.toLowerCase().includes(selectedRegion);
		});

		const countryContainer = document.querySelector('#countryList');
		countryContainer.innerHTML = '';

		diplayCountries(query);
	});

	toggleMode();
	getCountries();
});
