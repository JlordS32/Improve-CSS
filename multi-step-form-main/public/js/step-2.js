document.addEventListener('DOMContentLoaded', () => {
	const nextBtnElement = document.querySelector(
		'.selection-container .next-btn'
	);
	const backBtnElement = document.querySelector(
		'.selection-container .back-btn'
	);
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
		});
	});

	togglePlanElement.addEventListener('click', () => {
		if (togglePlanElement.classList.contains('monthly')) {
			togglePlanElement.classList.remove('monthly');
			togglePlanElement.classList.add('yearly');
			monthlyElement.style.color = 'hsl(231, 11%, 63%)';
			yearlyElement.style.color = 'hsl(213, 96%, 18%)';

			// Add '2 months free' text if yearly plan is chosen.
			planElement.forEach((plan) => {
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
				const twoMonthsFreeText = plan.querySelector('.yearly-freebie'); // Assuming you added a class to the 2 months free text

				if (twoMonthsFreeText) {
					twoMonthsFreeText.remove();
				}
			});
		}
	});

	nextBtnElement.addEventListener('click', () => {
		window.location.href = './3.html';
	});

	backBtnElement.addEventListener('click', () => {
		window.location.href = '../../index.html';
	});
});
