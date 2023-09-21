function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function createAddOnElement(addOns, addOnsElement, userPlan) {
	addOns.forEach((addOn) => {
		const addOnElement = document.createElement('div');
		const price = parseFloat(addOn.price.toString().match(/\d+(\.\d+)?/)[0]);

		addOnElement.innerHTML = `<p class="add-on-name">${
			addOn.name
		}</p> <p class="add-on-price">$${
			userPlan.frequency === 'yearly' ? price * 10 : price
		}/${userPlan.frequency === 'yearly' ? 'yr' : 'mo'}</p>`;

		addOnsElement.appendChild(addOnElement);
	});
}

function calculateTotal(addOns, userPlan) {
	let total = 0;

	addOns.forEach((addOn) => {
		const price = parseFloat(addOn.price.toString().match(/\d+(\.\d+)?/)[0]);
		total += price;
	});

	total += userPlan.price;

	console.log(total);
}

document.addEventListener('DOMContentLoaded', () => {
	const userPlan = JSON.parse(localStorage.getItem('userPlan'));
	const addOns = JSON.parse(localStorage.getItem('addOns'));

	const planElement = document.querySelector('.selected-plan .plan');
	const planPriceElement = document.querySelector('.selected-plan .plan-price');
	const extraAddOnsElement = document.querySelector('.extra-add-ons');

	planElement.textContent = `${capitalizeFirstLetter(
		userPlan.plan
	)} (${capitalizeFirstLetter(userPlan.frequency)})`;
	planPriceElement.textContent = `$${userPlan.price}/${
		userPlan.frequency === 'yearly' ? 'yr' : 'mo'
	}`;

	createAddOnElement(addOns, extraAddOnsElement, userPlan);

	// Callling function to calculate total
	calculateTotal(addOns, userPlan);

	const backBtnElement = document.querySelector(
		'.selection-container .back-btn'
	);

	backBtnElement.addEventListener('click', () => {
		window.location.href = './3.html';
	});
});
