document.addEventListener('DOMContentLoaded', () => {
	const formBtnElement = document.querySelector('.form button');

	formBtnElement.addEventListener('click', () => {
		window.location.href = './public/step/2.html';
	});
});
