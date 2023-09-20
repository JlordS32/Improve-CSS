document.addEventListener('DOMContentLoaded', () => {
	// Regex for validation
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	const nameRegex = /^[A-Za-z\s]+$/;
	const phoneRegex = /^(?:\+\d{1,3})?\d{10}$/;

	const formBtnElement = document.querySelector('.form button');
	const nameInputElement = document.querySelector('.form input[name="name"]');
	const phoneInputElement = document.querySelector('.form input[name="phone"]');
	const emailInputElement = document.querySelector(
		'.form input[name="email-address"]'
	);

	const personalInfoLocalised = JSON.parse(
		localStorage.getItem('personalInfo')
	);

	console.log(personalInfoLocalised);

	if (personalInfoLocalised) {
		nameInputElement.value = personalInfoLocalised.name;
		emailInputElement.value = personalInfoLocalised.email;
		phoneInputElement.value = personalInfoLocalised.phone;
	}

	formBtnElement.addEventListener('click', () => {
		const emailValue = emailInputElement.value;
		const nameValue = nameInputElement.value;
		const phoneValue = phoneInputElement.value;

		const isEmailValid = emailRegex.test(emailValue);
		const isNameValid = nameRegex.test(nameValue);
		const isPhoneValid = phoneRegex.test(phoneValue);

		const invalidLabelEmail = document.querySelector(
			'.form .invalid[for="email-address"]'
		);
		const invalidLabelName = document.querySelector(
			'.form .invalid[for="name"]'
		);
		const invalidLabelPhone = document.querySelector(
			'.form .invalid[for="phone"]'
		);

		invalidLabelEmail.style.display = isEmailValid ? 'none' : 'block';
		invalidLabelName.style.display = isNameValid ? 'none' : 'block';
		invalidLabelPhone.style.display = isPhoneValid ? 'none' : 'block';

		if (isEmailValid && isNameValid && isPhoneValid) {
			const personalInfo = {
				name: nameValue,
				email: emailValue,
				phone: phoneValue,
			};

			localStorage.setItem('personalInfo', JSON.stringify(personalInfo));

			window.location.href = './public/step/2.html';
		}
	});
});
