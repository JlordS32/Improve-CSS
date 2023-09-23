function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function createAddOnElement(addOns, addOnsElement, userPlan) {
	const totalContainer = document.querySelector('.total');

	addOns.forEach((addOn) => {
		const addOnElement = document.createElement('div');
		const price = parseFloat(addOn.price.toString().match(/\d+(\.\d+)?/)[0]);

		addOnElement.innerHTML = `
		<p class="add-on-name">${addOn.name}</p> 
		<p class="add-on-price">$${price}/${
			userPlan.frequency === 'yearly' ? 'yr' : 'mo'
		}
		</p>`;

		addOnsElement.appendChild(addOnElement);
	});

	totalContainer.appendChild(addOnsElement);
}

function calculateTotal(addOns, userPlan) {
	let total = 0;

	addOns.forEach((addOn) => {
		const price = parseFloat(addOn.price.toString().match(/\d+(\.\d+)?/)[0]);
		total += price;
	});

	total += userPlan.price;

	return total;
}

document.addEventListener('DOMContentLoaded', () => {
	const userPlan = JSON.parse(localStorage.getItem('userPlan'));
	const addOns = JSON.parse(localStorage.getItem('addOns'));
	const backBtnElement = document.querySelector(
		'.selection-container .back-btn'
	);
	const nextBtnElement = document.querySelector(
		'.selection-container .next-btn'
	);
	const changeBtn = document.querySelector('.selected-plan button');
	const planElement = document.querySelector('.selected-plan .plan');
	const planPriceElement = document.querySelector('.selected-plan .plan-price');
	const extraAddOnsElement = document.createElement('div');
	extraAddOnsElement.classList.add('extra-add-ons');
	const totalPriceElement = document.querySelector('.total-price');
	const totalTextElement = document.querySelector('.grand-total-price .total-text');

	if (addOns.length === 0) {
		extraAddOnsElement.style.display = 'none';
	}

	planElement.textContent = `${capitalizeFirstLetter(
		userPlan.plan
	)} (${capitalizeFirstLetter(userPlan.frequency)})`;
	planPriceElement.textContent = `$${userPlan.price}/${
		userPlan.frequency === 'yearly' ? 'yr' : 'mo'
	}`;

	createAddOnElement(addOns, extraAddOnsElement, userPlan);

	// Create total element

	const totalPriceText = `+$${calculateTotal(addOns, userPlan)}/${
		userPlan.frequency === 'yearly' ? 'yr' : 'mo'
	}`;

	totalPriceElement.textContent = totalPriceText;
	totalTextElement.textContent = `Total (per ${userPlan.frequency === 'yearly' ? 'year' : 'month'})`;

	changeBtn.addEventListener('click', () => {
		window.location.href = './2.html';
	})

	backBtnElement.addEventListener('click', () => {
		window.location.href = './3.html';
	});

	nextBtnElement.addEventListener('click', () => {
		window.location.href = './thank-you.html';
	});
});
