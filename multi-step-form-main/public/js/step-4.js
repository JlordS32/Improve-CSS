function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function createAddOnElement(addOns, addOnsElement) {
	addOns.forEach((addOn) => {
		const addOnElement = document.createElement('div');
		addOnElement.innerHTML = `<p class="add-on-name">${addOn.name}</p> <p class="add-on-price">${addOn.price}</p>`;

		addOnsElement.appendChild(addOnElement);
	});
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

	createAddOnElement(addOns, extraAddOnsElement);

	const backBtnElement = document.querySelector(
		'.selection-container .back-btn'
	);

	backBtnElement.addEventListener('click', () => {
		window.location.href = './3.html';
	});
});
