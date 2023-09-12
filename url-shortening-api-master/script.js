// Function to fetch a shortened URL using the shrtco.de API
const fetchShortUrl = async (linkToShortened) => {
	const response = await fetch(
		`https://api.shrtco.de/v2/shorten?url=${linkToShortened}`
	);
	const data = await response.json();

	return data;
};

// When the DOM (Document Object Model) is fully loaded, execute the following code
document.addEventListener('DOMContentLoaded', async () => {
	// Get references to various DOM elements using their IDs or classes
	const shortenerBtn = document.getElementById('shortenerBtn'); // Shorten button
	const input = document.querySelector('.link-shorterer-input'); // Input field
	const label = document.querySelector('.call-to-action div > label'); // Validation label
	const urlContainer = document.querySelector('.url-container'); // Container for displaying shortened URLs

	// Check if there's any existing data in localStorage
	let localisedUrl = JSON.parse(localStorage.getItem('shortenedLinks')) || [];

	if (localisedUrl) {
		localisedUrl.forEach((link) => {
			createNewShortLinkContainer(link.originalUrl, link.shortUrl);
		});
	}

	// Add a click event listener to the "Shorten" button
	shortenerBtn.addEventListener('click', (e) => {
		e.preventDefault();
		// Get the input value and trim any leading/trailing spaces
		const inputValue = input.value.trim();

		// Validate if the link is invalid
		const isLinkInvalid = isInvalidUrl(inputValue);

		// Check if it's a valid URL
		if (isLinkInvalid) {
			// Invalid link handling logic
			input.style.border = '2px solid red'; // Highlight input field in red
			label.style.display = 'flex'; // Display the validation label
		} else {
			// Valid link handling logic
			input.style.border = '0'; // Remove the red border
			label.style.display = 'none'; // Hide the validation label
			// Fetch and display the shortened URL
			fetchShortUrl(inputValue).then((link) => {
				createNewShortLinkContainer(inputValue, link.result.short_link);

				const newShortURL = {
					originalUrl: inputValue,
					shortUrl: link.result.short_link,
				};

				localisedUrl.push(newShortURL);
				localStorage.setItem('shortenedLinks', JSON.stringify(localisedUrl));
			});
		}
	});

	// Function to create a new container for displaying a shortened URL
	function createNewShortLinkContainer(url, shorturl) {
		if (url === '' || shorturl === '') return;

		const newShortUrl = document.createElement('div');
		const originUrl = document.createElement('p');
		const shortenedUrl = document.createElement('span');
		const copyBtn = document.createElement('button');
		const deleteBtn = document.createElement('button');

		// Add CSS classes to the elements
		newShortUrl.classList.add('shortened-link');
		shortenedUrl.classList.add('textToCopy');
		copyBtn.classList.add('copyUrl');
		deleteBtn.classList.add('deleteUrl');

		// Set text content for elements
		shortenedUrl.textContent = shorturl;
		originUrl.textContent = url;
		copyBtn.textContent = 'Copy';
		deleteBtn.textContent = 'Delete';

		// Append elements to the new container
		newShortUrl.appendChild(originUrl);
		newShortUrl.appendChild(shortenedUrl);
		newShortUrl.appendChild(copyBtn);
		newShortUrl.appendChild(deleteBtn);

		// Append the new container to the parent container
		urlContainer.appendChild(newShortUrl);
	}

	function deleteShortUrl(shortURL) {
		const localisedURL =
			JSON.parse(localStorage.getItem('shortenedLinks')) || [];

		const updatedURL = localisedURL.filter(
			(link) => link.shortUrl !== shortURL
		);

		localStorage.setItem('shortenedLinks', JSON.stringify(updatedURL));

		location.reload();
	}

	// Function to copy a shortened URL to the clipboard
	function copyShortUrl(event) {
		const textToCopy = event.target.previousElementSibling.innerText;

		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				event.target.innerText = 'Copied!'; // Change button text to "Copied!"
				event.target.style.backgroundColor = 'hsl(259, 27%, 21%)'; // Change button color
				setTimeout(() => {
					event.target.innerText = 'Copy'; // Reset button text to "Copy" after 3 seconds
					event.target.style.backgroundColor = 'hsl(180, 66%, 49%)'; // Reset button color
				}, 3000);
			})
			.catch((error) => {
				console.error('Unable to copy text: ', error);
			});
	}

	// Attach a click event listener to the document for event delegation
	document.addEventListener('click', (event) => {
		if (event.target.classList.contains('copyUrl')) {
			copyShortUrl(event);
		}
	});

	document.addEventListener('click', (event) => {
		if (event.target.classList.contains('deleteUrl')) {
			const copyBtn = event.target.previousElementSibling;
			const toRemove = copyBtn.previousElementSibling;

			deleteShortUrl(toRemove.textContent);
		}
	});

	// Function to validate a URL using a regular expression
	function isInvalidUrl(url) {
		if (url === '') return true;

		// Regular expression to check if the input is a valid URL
		var urlPattern =
			/^(https?:\/\/)?([\w.-]+\.[A-Za-z]{2,})(\/[\w.-]*)*(\?[\w.-]*=[\w.-]*(&[\w.-]*=[\w.-]*)*)*\/?$/i;

		// Return true if the URL does not match the pattern
		return !urlPattern.test(url);
	}
});
