document.addEventListener('DOMContentLoaded', () => {
	const nextBtnElement = document.querySelector(
		'.selection-container .next-btn'
	);
	const backBtnElement = document.querySelector(
		'.selection-container .back-btn'
	);

	nextBtnElement.addEventListener('click', () => {
		window.location.href = './4.html';
	});

	backBtnElement.addEventListener('click', () => {
		window.location.href = './2.html';
	});
});
