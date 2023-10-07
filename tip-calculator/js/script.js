function updateCheckout(bill, tip, numberOfPeople) {
	if (!bill || !tip || !numberOfPeople) {
		return;
	}

	const checkoutContainer = document.querySelector('.checkout-container');
	const tipElement = checkoutContainer.querySelector('.tip-wrapper .amount');
	const totalElement = checkoutContainer.querySelector(
		'.total-wrapper .amount'
	);

	const resetBtn = document.querySelector('.checkout-container button');
	resetBtn.style.opacity = '1';

	const totalTipPerson = (bill * (tip / 100)) / numberOfPeople;
	const roundedTotalTipPerson = Number(totalTipPerson.toFixed(2));

	const totalAmountPerson = bill / numberOfPeople + totalTipPerson;
	const roundedTotalAmountPerson = Number(totalAmountPerson.toFixed(2));

	tipElement.innerText = `$${roundedTotalTipPerson}`;
	totalElement.innerText = `$${roundedTotalAmountPerson}`;
}

document.addEventListener('DOMContentLoaded', () => {
	const tipCalculatorElement = document.querySelector('.tip-calculator');
	const percentageElement = tipCalculatorElement.querySelector('.percentage');
	const billElement = tipCalculatorElement.querySelector(
		'.input-wrapper input'
	);
	const numberOfPeopleElement = tipCalculatorElement.querySelector(
		'.number-of-people input'
	);
	const resetBtn = document.querySelector('.checkout-container button');
	const tipElement = document.querySelector('.tip-wrapper .amount');
	const totalElement = document.querySelector('.total-wrapper .amount');

	let selectedTip = 0;

	percentageElement.querySelectorAll('div').forEach((percentage) => {
		percentage.addEventListener('click', () => {
			// Remove active class from all other elements
			percentageElement.querySelectorAll('div').forEach((el) => {
				el.classList.remove('active');
			});

			// Add active class to the clicked element
			percentage.classList.add('active');

			selectedTip = parseInt(percentage.innerText);

			updateCheckout(
				billElement.value,
				selectedTip,
				numberOfPeopleElement.value
			);
		});
	});

	percentageElement
		.querySelector('.custom-percentage input')
		.addEventListener('input', (e) => {
			selectedTip = parseInt(e.target.value);

			updateCheckout(
				billElement.value,
				selectedTip,
				numberOfPeopleElement.value
			);
		});

	billElement.addEventListener('input', () => {
		updateCheckout(billElement.value, selectedTip, numberOfPeopleElement.value);
	});

	numberOfPeopleElement.addEventListener('input', () => {
		const isGreaterThanZero = parseInt(numberOfPeopleElement.value) > 0;

		console.log(isGreaterThanZero);

		if (isGreaterThanZero) {
			updateCheckout(
				billElement.value,
				selectedTip,
				numberOfPeopleElement.value
			);
		}

		numberOfPeopleElement.parentElement.classList.toggle(
			'invalid',
			!isGreaterThanZero
		);
	});

	resetBtn.addEventListener('click', () => {
		selectedTip = 0;
		billElement.value = '';
		numberOfPeopleElement.value = '';
		totalElement.innerText = '$0.00';
		tipElement.innerText = '$0.00';
		resetBtn.style.opacity = '0.2';

		percentageElement.querySelectorAll('div').forEach((percentage) => {
			percentage.classList.remove('active');
		});
	});
});
