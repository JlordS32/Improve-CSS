document.addEventListener('DOMContentLoaded', () => {
	const todoCheckBoxElement = document.querySelectorAll('.checkbox');

	// Creating checked image element
	const imgElement = document.createElement('img');
	imgElement.setAttribute('src', './images/icon-check.svg');

	todoCheckBoxElement.forEach((checkbox) => {
		checkbox.addEventListener('click', () => {
			todoCheckBoxElement.forEach((checkbox) => {
				checkbox.classList.remove('checked');
			});

			// Add 'checked' class to checkbox element and append img element.
			if (checkbox.classList.contains('checked')) {
				checkbox.classList.remove('checked');
				checkbox.removeChild(checkbox.querySelector('img'));
            console.log('contains')
			} else {
				checkbox.classList.add('checked');
				checkbox.appendChild(imgElement);
            console.log('not contains')

			}
		});
	});
});
