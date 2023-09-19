document.addEventListener('DOMContentLoaded', () => {
	const nextBtnElement = document.querySelector(
		'.selection-container .next-btn'
	);
	const backBtnElement = document.querySelector(
		'.selection-container .back-btn'
	);
	const extraElement = document.querySelectorAll('.extra');

	extraElement.forEach((extra) => {
		extra.addEventListener('click', () => {
			const checkboxElement = extra.querySelector('.checkbox');

			if (checkboxElement.classList.contains('checked')) {
				checkboxElement.classList.remove('checked');
				checkboxElement.querySelector('img').style.display = 'none';
            extra.style.outline = '2px solid hsl(231, 11%, 63%)';
            extra.style.backgroundColor = 'hsl(0, 0%, 100%)';
            
			} else {
				checkboxElement.classList.add('checked');
				checkboxElement.querySelector('img').style.display = 'flex';
            extra.style.outline = '2px solid hsl(213, 96%, 18%)';
            extra.style.backgroundColor = 'hsl(230, 75%, 98%)';
			}
		});
	});

	nextBtnElement.addEventListener('click', () => {
		window.location.href = './4.html';
	});

	backBtnElement.addEventListener('click', () => {
		window.location.href = './2.html';
	});
});
