function calculate(expression) {
	try {
		if (expression === '0/0') return 'Cannot divide by zero';

		const isLastChrOperator = isOperator(
			expression.charAt(expression.length - 1)
		);

		if (isLastChrOperator) {
			const newExpression = expression.slice(0, -1);

			const result = eval(newExpression);
			return roundToNearestThird(result);
		}

		const result = eval(expression.replace(/x/g, '*')); // Replace 'x' with '*'
		return roundToNearestThird(result);
	} catch (error) {
		return 'Error';
	}
}

// Function to round a number to the nearest third decimal place
function roundToNearestThird(number) {
	return parseFloat(number.toFixed(3));
}

function isOperator(operator) {
	if (['/', '+', '-', 'x'].includes(operator)) return true;

	return false;
}

function applyTheme(themeNumber) {
   const themeVariables = [
       {
           '--default-theme-bg-main': 'var(--theme1-bg-main)',
           '--default-theme-bg-numpad-bg': 'var(--theme1-bg-numpad-bg)',
           '--default-theme-bg-output': 'var(--theme1-bg-output)',
           '--default-theme-bg-clear': 'var(--theme1-bg-clear)',
           '--default-theme-bg-clear-shadow': 'var(--theme1-bg-clear-shadow)',
           '--default-theme-accent': 'var(--theme1-accent)',
           '--default-theme-accent-shadow': 'var(--theme1-accent-shadow)',
           '--default-theme-numpad': 'var(--theme1-numpad)',
           '--default-theme-numpad-shadow': 'var(--theme1-numpad-shadow)',
           '--default-theme-text-dark': 'var(--theme1-text-dark)',
           '--default-theme-text-white': 'var(--theme1-text-white)',
           '--default-theme-text-logo': 'var(--theme1-text-white)',
           '--default-theme-text-output': 'var(--theme1-text-white)'
       },
       {
           '--default-theme-bg-main': 'var(--theme2-bg-main)',
           '--default-theme-bg-numpad-bg': 'var(--theme2-bg-numpad-bg)',
           '--default-theme-bg-output': 'var(--theme2-bg-output)',
           '--default-theme-bg-clear': 'var(--theme2-bg-clear)',
           '--default-theme-bg-clear-shadow': 'var(--theme2-bg-clear-shadow)',
           '--default-theme-accent': 'var(--theme2-accent-bg)',
           '--default-theme-accent-shadow': 'var(--theme2-accent-shadow)',
           '--default-theme-numpad': 'var(--theme2-numpad)',
           '--default-theme-numpad-shadow': 'var(--theme2-numpad-shadow)',
           '--default-theme-text-dark': 'var(--theme2-text-dark)',
           '--default-theme-text-white': 'var(--theme2-text-white)',
           '--default-theme-text-logo': 'var(--theme2-text-black)',
           '--default-theme-text-output': 'var(--theme2-text-black)'
       },
       {
           '--default-theme-bg-main': 'var(--theme3-bg-main)',
           '--default-theme-bg-numpad-bg': 'var(--theme3-bg-numpad-bg)',
           '--default-theme-bg-output': 'var(--theme3-bg-output)',
           '--default-theme-bg-clear': 'var(--theme3-bg-clear)',
           '--default-theme-bg-clear-shadow': 'var(--theme3-bg-clear-shadow)',
           '--default-theme-accent': 'var(--theme3-accent-bg)',
           '--default-theme-accent-shadow': 'var(--theme3-accent-shadow)',
           '--default-theme-numpad': 'var(--theme3-numpad)',
           '--default-theme-numpad-shadow': 'var(--theme3-numpad-shadow)',
           '--default-theme-text-dark': 'var(--theme3-text-yellow)',
           '--default-theme-text-white': 'var(--theme3-text-white)',
           '--default-theme-text-logo': 'var(--theme3-text-yellow)',
           '--default-theme-text-output': 'var(--theme3-text-yellow)'
       }
   ];

   const selectedTheme = themeVariables[themeNumber - 1];

   for (const [property, value] of Object.entries(selectedTheme)) {
       document.documentElement.style.setProperty(property, value);
   }
}


document.addEventListener('DOMContentLoaded', () => {
	const outputElement = document.querySelector('.output p');
	const numpads = document.querySelectorAll('.numpad-items');
	const equalBtn = document.querySelector('.equal');
	const deleteBtn = document.querySelector('.delete');
	const resetBtn = document.querySelector('.reset');
	const switchThemeElement = document.querySelectorAll('.theme');
	const switchCircleElement = document.querySelector('.switch-knob .circle');
	let errorOccurred = false; // Flag to track if an error occurred

	switchThemeElement.forEach((theme) => {
		theme.addEventListener('click', () => {
			console.log(theme.getAttribute('data') == 2);
			if (theme.getAttribute('data') == 1) {
				switchCircleElement.style.left = '7%';

				applyTheme(1);
			}
			if (theme.getAttribute('data') == 2) {
				switchCircleElement.style.left = '37.5%';

				applyTheme(2);
			}
			if (theme.getAttribute('data') == 3) {
				switchCircleElement.style.left = '70%';

				applyTheme(3);
			}
		});
	});

	numpads.forEach((numpad) => {
		if (
			numpad.classList.contains('reset') ||
			numpad.classList.contains('delete') ||
			numpad.classList.contains('equal')
		)
			return;

		numpad.addEventListener('click', () => {
			if (errorOccurred) {
				outputElement.textContent = ''; // Clear the error message
				errorOccurred = false; // Reset the error flag
			}

			const operator = outputElement.textContent.charAt(
				outputElement.textContent.length - 1
			);

			const prevIsOperator = isOperator(operator);
			const nextIsOperator = isOperator(numpad.textContent);

			// Validate if next operator is an operator to prevent from being inputted
			if (prevIsOperator && nextIsOperator) {
				const newOutput = outputElement.textContent.slice(0, -1);

				outputElement.textContent = newOutput + numpad.textContent;
			} else {
				const equation = (outputElement.textContent += numpad.textContent);

				outputElement.textContent = equation;
			}
		});
	});

	equalBtn.addEventListener('click', () => {
		if (outputElement.textContent.length === 0) return;

		const result = calculate(outputElement.textContent);

		// Set the error flag
		if (result === 'Error' || result === 'Cannot divide by zero') {
			errorOccurred = true;
		}

		outputElement.textContent = result;
	});

	deleteBtn.addEventListener('click', () => {
		if (outputElement.textContent.length === 0) return;

		const newOutput = outputElement.textContent.slice(0, -1);
		outputElement.textContent = newOutput;
	});

	resetBtn.addEventListener('click', () => {
		outputElement.textContent = '';
		errorOccurred = false; // Reset the error flag when resetting
	});
});
