document.addEventListener('DOMContentLoaded', () => {
	const userPlan = JSON.parse(localStorage.getItem('userPlan'));

	const nextBtnElement = document.querySelector(
		'.selection-container .next-btn'
	);
	const backBtnElement = document.querySelector(
		'.selection-container .back-btn'
	);
	const extraElement = document.querySelectorAll('.extra');

	let selectedAddOns =
		JSON.parse(localStorage.getItem('addOns')) || new Array();

	extraElement.forEach((extra) => {
		const priceElement = extra.querySelector('.price');

		const price = parseFloat(
			priceElement.textContent.toString().match(/\d+(\.\d+)?/)[0]
		);

		if (userPlan.frequency === 'yearly') {
			priceElement.textContent = `+$${price * 10}/yr`;
			selectedAddOns = selectedAddOns.map(addon => {
				return {
					...addon,
					price: `+$${price * 10}/yr`
				}
			})
		} else {
			priceElement.textContent = `+$${price}/mo`;
			selectedAddOns = selectedAddOns.map(addon => {
				return {
					...addon,
					price: `+$${price}/mo`
				}
			})
		}
	});

	if (selectedAddOns) {
		extraElement.forEach((extra) => {
			const checkboxElement = extra.querySelector('.checkbox');
			const addOn = extra.querySelector('.service p').textContent;

			console.log(selectedAddOns);

			if (selectedAddOns) {
				selectedAddOns.forEach((selectedAddOn) => {
					if (selectedAddOn.name === addOn) {
						extra.classList.add('checked');
						checkboxElement.classList.add('checked');
						checkboxElement.querySelector('img').style.display = 'flex';
					}
				});
			}
		});
	}
	extraElement.forEach((extra) => {
		extra.addEventListener('click', () => {
			const checkboxElement = extra.querySelector('.checkbox');

			const addOn = extra.querySelector('.service p').textContent;
			const price = extra.querySelector('.price').textContent;

			console.log(price);

			const newAddOn = {
				name: addOn,
				price: price,
			};

			const existingAddOn = selectedAddOns.find(
				(item) => item.name === newAddOn.name
			);

			if (existingAddOn) {
				checkboxElement.classList.remove('checked');
				extra.classList.remove('checked');

				checkboxElement.querySelector('img').style.display = 'none';

				selectedAddOns = selectedAddOns.filter(
					(item) => item.name !== newAddOn.name
				);
			} else {
				checkboxElement.classList.add('checked');
				extra.classList.add('checked');

				checkboxElement.querySelector('img').style.display = 'flex';

				selectedAddOns.push(newAddOn);
			}
		});
	});

	nextBtnElement.addEventListener('click', () => {
		window.location.href = './4.html';

		localStorage.setItem('addOns', JSON.stringify(selectedAddOns));
	});

	backBtnElement.addEventListener('click', () => {
		window.location.href = './2.html';

		localStorage.setItem('addOns', JSON.stringify(selectedAddOns));
	});
});
