function activateSelectedSteps(selectedSteps) {
	const sideBarStepsElement = document.querySelector('.sidebar');

	switch (selectedSteps) {
		case 1:
			sideBarStepsElement.children[0].classList.add('active-step');
			console.log(sideBarStepsElement.children[0]);
			break;
		case 2:
			sideBarStepsElement.children[1].classList.add('active-step');
			console.log(sideBarStepsElement.children[1]);
			break;
		case 3:
			sideBarStepsElement.children[2].classList.add('active-step');
			console.log(sideBarStepsElement.children[2]);
			break;
		case 4:
			sideBarStepsElement.children[3].classList.add('active-step');
			console.log(sideBarStepsElement.children[3]);
			break;
		default:
			break;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const formBtnElement = document.querySelector('.form button');
	const containerElement = document.querySelector('.container');
	const currentStep = containerElement.children[1];

	if (currentStep && currentStep.className) {
		switch (currentStep.className) {
			case 'step-1-wrapper':
				activateSelectedSteps(1);
				break;
			case 'step-2-wrapper':
				console.log(currentStep.className);
				activateSelectedSteps(2);
				break;
			default:
				break;
		}
	}
});
