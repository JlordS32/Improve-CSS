function activateSelectedSteps(selectedSteps) {
	const sideBarStepsElement = document.querySelector('.sidebar');

	switch (selectedSteps) {
		case 1:
			sideBarStepsElement.children[0].classList.add('active-step');
			break;
		case 2:
			sideBarStepsElement.children[1].classList.add('active-step');
			break;
		case 3:
			sideBarStepsElement.children[2].classList.add('active-step');
			break;
		case 4:
			sideBarStepsElement.children[3].classList.add('active-step');
			break;
		default:
			break;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const containerElement = document.querySelector('.container');
	const currentStep = containerElement.children[1];

	if (currentStep && currentStep.classList.item(1)) {
		switch (currentStep.classList.item(1)) {
			case 'step-1-wrapper':
				activateSelectedSteps(1);
				break;
			case 'step-2-wrapper':
				activateSelectedSteps(2);
				break;
			case 'step-3-wrapper':
				activateSelectedSteps(3);
				break;
			case 'step-4-wrapper':
				activateSelectedSteps(4);
				break;
			default:
				break;
		}
	}
});
