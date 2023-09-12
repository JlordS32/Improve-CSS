const fetchShortUrl = async (linkToShortened) => {
	const response = await fetch(
		`https://api.shrtco.de/v2/shorten?url=${linkToShortened}`
	);
	const data = await response.json();

	return data;
};

document.addEventListener('DOMContentLoaded', async () => {
	const shortenerBtn = document.getElementById('shortenerBtn');
	const input = document.querySelector('.link-shorterer-input');
	const label = document.querySelector('.call-to-action div > label');
	const urlContainer = document.querySelector('.url-container');
	shortenerBtn.addEventListener('click', (e) => {
		e.preventDefault();
		// Get the input value
		const inputValue = input.value.trim();

		// Validate if link is valid
		const isLinkInvalid = isInvalidUrl(inputValue);

		// Validate if it's a valid URL
		if (isLinkInvalid) {
			// You can perform your link shortening logic here
			input.style.border = '2px solid red';
			label.style.display = 'flex';
		} else {
			input.style.border = '0';
			label.style.display = 'none';
			fetchShortUrl(inputValue).then((link) => {
				createNewShortLinkContainer(inputValue, link.result.short_link);
			});
		}
	});

	function createNewShortLinkContainer(url, shorturl) {
		const newShortUrl = document.createElement('div');
		const originUrl = document.createElement('p');
		const shortenedUrl = document.createElement('span');
		const copyBtn = document.createElement('button');

		// Adding classes
		newShortUrl.classList.add('shortened-link');
		shortenedUrl.classList.add('textToCopy');
		copyBtn.classList.add('copyUrl');

		shortenedUrl.textContent = shorturl;
		originUrl.textContent = url;
		copyBtn.textContent = 'Copy';

		// Appending the new element to the short-url container
		newShortUrl.appendChild(originUrl);
		newShortUrl.appendChild(shortenedUrl);
		newShortUrl.appendChild(copyBtn);

		// Finally putting it into the parent container
		urlContainer.appendChild(newShortUrl);
	}

	function copyShortUrl(event) {
		const textToCopy = event.target.previousElementSibling.innerText;

		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				event.target.innerText = 'Copied!';
				event.target.style.backgroundColor = 'hsl(259, 27%, 21%)';
				setTimeout(() => {
					event.target.innerText = 'Copy';
					event.target.style.backgroundColor = 'hsl(180, 66%, 49%)';
				}, 3000);
			})
			.catch((error) => {
				console.error('Unable to copy text: ', error);
			});
	}

	// Attach the event listener to the document and use event delegation
	document.addEventListener('click', (event) => {
		if (event.target.classList.contains('copyUrl')) {
			copyShortUrl(event);
		}
	});

	function isInvalidUrl(url) {
		if (url === '') return true;

		// Regular expression to check if the input is a valid URL
		var urlPattern = /^(https?:\/\/)?([\w.-]+\.[A-Za-z]{2,})(\/[\w.-]*)*(\?[\w.-]*=[\w.-]*(&[\w.-]*=[\w.-]*)*)*\/?$/i;

      console.log(urlPattern.test(url));
		return !urlPattern.test(url);
	}
});
