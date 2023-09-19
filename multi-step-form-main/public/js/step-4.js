document.addEventListener('DOMContentLoaded', () => {
	const backBtnElement = document.querySelector(
		'.selection-container .back-btn'
	);

	backBtnElement.addEventListener('click', () => {
		window.location.href = './3.html';
	});
});
