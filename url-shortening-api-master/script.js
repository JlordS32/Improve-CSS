const fetchShortUrl = async (linkToShortened) => {
	const response = await fetch(
		`https://api.shrtco.de/v2/shorten?url=${linkToShortened}`
	);
	const data = await response.json();

	return data;
};

document.addEventListener('DOMContentLoaded', () => {
	const shortenerBtn = document.getElementById('shortenerBtn');
	const input = document.querySelector('.link-shorterer-input');
	const label = document.querySelector('.call-to-action div > label');

	shortenerBtn.addEventListener('click', (e) => {
      e.preventDefault();
		// Get the input value
		const inputValue = input.value;
		console.log(inputValue);

		// Validate if it's a valid URL
		if (isInvalidUrl(inputValue)) {
			// You can perform your link shortening logic here
			input.style.border = '2px solid red';
         label.style.display = 'flex';
		} else {
         input.style.border = '0';
         label.style.display = 'none';
		}
	});

	function isInvalidUrl(url) {
		// Regular expression to check if the input is a valid URL
		var urlPattern = /^(https?:\/\/)?([\w.-]+)(\/[\w.-]*)*\/?$/;
		return urlPattern.test(url);
	}
});
