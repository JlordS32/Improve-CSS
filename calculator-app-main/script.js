function calculate(expression) {
	try {
		if (expression === '0/0') return 'Cannot divide by zero';

		const isLastChrOperator = isOperator(
			expression.charAt(expression.length - 1)
		);

		if (isLastChrOperator) {
			const newExpression = expression.slice(0, -1);

			const result = eval(newExpression);
			return result;
		}

		const result = eval(expression.replace(/x/g, '*')); // Replace 'x' with '*'
		return result;
	} catch (error) {
		return 'Error';
	}
}

function isOperator(operator) {
	if (['/', '+', '-', 'x'].includes(operator)) return true;

	return false;
}

document.addEventListener('DOMContentLoaded', () => {
	const outputElement = document.querySelector('.output p');
	const numpads = document.querySelectorAll('.numpad-items');
	const equalBtn = document.querySelector('.equal');
	const deleteBtn = document.querySelector('.delete');
	const resetBtn = document.querySelector('.reset');
	let errorOccurred = false; // Flag to track if an error occurred

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
