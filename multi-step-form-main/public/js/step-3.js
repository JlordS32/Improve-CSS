document.addEventListener('DOMContentLoaded', () => {
	const nextBtnElement = document.querySelector(
		'.selection-container .next-btn'
	);
	const backBtnElement = document.querySelector(
		'.selection-container .back-btn'
	);
	const extraElement = document.querySelectorAll('.extra');

	let selectedAddOns =
		JSON.parse(localStorage.getItem('addOns')) || new Array();

	if (selectedAddOns) {
		extraElement.forEach((extra) => {
			const checkboxElement = extra.querySelector('.checkbox');
			const addOn = extra.querySelector('.service p').textContent;

			selectedAddOns.forEach((selectedAddOn) => {
				if (selectedAddOn.name === addOn) {
					extra.classList.add('checked');
					checkboxElement.classList.add('checked');
					checkboxElement.querySelector('img').style.display = 'flex';
				} else {
					extra.classList.remove('checked');
					checkboxElement.classList.remove('checked');
					checkboxElement.querySelector('img').style.display = 'none';
				}
			});
		});
	}

	extraElement.forEach((extra) => {
		extra.addEventListener('click', () => {
			const checkboxElement = extra.querySelector('.checkbox');

			const addOn = extra.querySelector('.service p').textContent;
			const price = extra.querySelector('.price').textContent;

			const newAddOn = {
				name: addOn,
				price: price,
			};

			if (checkboxElement.classList.contains('checked')) {
				checkboxElement.classList.remove('checked');
				extra.classList.remove('checked');

				checkboxElement.querySelector('img').style.display = 'none';

				selectedAddOns = selectedAddOns.filter(
					(item) => item.name !== newAddOn.name
				);
				localStorage.setItem('addOns', JSON.stringify(selectedAddOns));
			} else {
				checkboxElement.classList.add('checked');
				extra.classList.add('checked');

				checkboxElement.querySelector('img').style.display = 'flex';

				selectedAddOns.push(newAddOn);
				localStorage.setItem('addOns', JSON.stringify(selectedAddOns));
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
