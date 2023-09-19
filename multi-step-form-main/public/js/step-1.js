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

	formBtnElement.addEventListener('click', () => {
		console.log('Email', emailRegex.test(emailInputElement.value));

		if (emailRegex.test(emailInputElement.value)) {
			window.location.href = './public/step/2.html';
		}
	});
});
