document.addEventListener('DOMContentLoaded', () => {
	const nextBtnElement = document.querySelector(
		'.selection-container .next-btn'
	);
	const backBtnElement = document.querySelector(
		'.selection-container .back-btn'
	);

	// Initialize userPlan from localStorage or with default values
	const userPlan = JSON.parse(localStorage.getItem('userPlan')) || {
		frequency: 'monthly',
		plan: 'arcade',
		price: 9,
	};

	const planElement = document.querySelectorAll('.plan');
	const togglePlanElement = document.querySelector('.toggle-btn');
	const yearlyElement = document.querySelector('.yearly');
	const monthlyElement = document.querySelector('.monthly');

	planElement.forEach((plan) => {
		plan.addEventListener('click', () => {
			planElement.forEach((plan) => {
				plan.classList.remove('active');
			});
			plan.classList.add('active');

			// Update userPlan variable
			userPlan.plan = plan.querySelector('.title').textContent.toLowerCase();
			const planPrice = parseFloat(
				plan
					.querySelector('.price')
					.textContent.toString()
					.match(/\d+(\.\d+)?/)[0]
			);

			userPlan.price = planPrice;
		});
	});

	if (userPlan) {
		togglePlanElement.classList.add(userPlan.frequency);

		planElement.forEach((plan) => {
			// Update price
			const price = plan.querySelector('.price');
			const numberValue = parseFloat(
				price.textContent.toString().match(/\d+(\.\d+)?/)[0]
			);

			if (userPlan.frequency === 'yearly') {
				price.textContent = `$${numberValue * 10}/yr`;

				const twoMonthsFreeText = document.createElement('p');
				twoMonthsFreeText.className = 'yearly-freebie';
				twoMonthsFreeText.textContent = '2 months free';

				plan.appendChild(twoMonthsFreeText);
			} else {
				price.textContent = `$${numberValue}/mo`;

				const twoMonthsFreeText = plan.querySelector('.yearly-freebie'); // Assuming you added a class to the 2 months free text

				if (twoMonthsFreeText) {
					twoMonthsFreeText.remove();
				}
			}
		});
	}

	togglePlanElement.addEventListener('click', (e) => {
		e.preventDefault();

		if (togglePlanElement.classList.contains('monthly')) {
			togglePlanElement.classList.remove('monthly');

			// Update userPlan variable
			togglePlanElement.classList.add('yearly');
			monthlyElement.style.color = 'hsl(231, 11%, 63%)';
			yearlyElement.style.color = 'hsl(213, 96%, 18%)';

			// Update the userPlan variable
			userPlan.price = userPlan.price * 10;
			userPlan.frequency = 'yearly';

			// Add '2 months free' text if yearly plan is chosen.
			planElement.forEach((plan) => {
				// Update price
				const price = plan.querySelector('.price');
				const numberValue = parseFloat(
					price.textContent.toString().match(/\d+(\.\d+)?/)[0]
				);

				price.textContent = `$${numberValue * 10}/yr`;

				const twoMonthsFreeText = document.createElement('p');
				twoMonthsFreeText.className = 'yearly-freebie';
				twoMonthsFreeText.textContent = '2 months free';

				plan.appendChild(twoMonthsFreeText);
			});
		} else {
			togglePlanElement.classList.add('monthly');
			togglePlanElement.classList.remove('yearly');
			monthlyElement.style.color = 'hsl(213, 96%, 18%)';
			yearlyElement.style.color = 'hsl(231, 11%, 63%)';

			planElement.forEach((plan) => {
				// Update price element
				const price = plan.querySelector('.price');
				const numberValue = parseFloat(
					price.textContent.toString().match(/\d+(\.\d+)?/)[0]
				);

				price.textContent = `$${numberValue / 10}/mo`;
			});

			// Update userPlan variable
			userPlan.frequency = 'monthly';
			userPlan.price = userPlan.price / 10;

			planElement.forEach((plan) => {
				const twoMonthsFreeText = plan.querySelector('.yearly-freebie'); // Assuming you added a class to the 2 months free text

				if (twoMonthsFreeText) {
					twoMonthsFreeText.remove();
				}
			});
		}
	});

	nextBtnElement.addEventListener('click', () => {
		window.location.href = './3.html';

		localStorage.setItem('userPlan', JSON.stringify(userPlan));
	});

	backBtnElement.addEventListener('click', () => {
		window.location.href = '../../index.html';

		localStorage.setItem('userPlan', JSON.stringify(userPlan));
	});
});
