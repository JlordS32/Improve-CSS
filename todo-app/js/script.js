import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener('DOMContentLoaded', () => {
	const todoCheckBoxElement = document.querySelectorAll('.todo div');
	const todoStateElement = document.querySelector('.todo-state-container');
	const todosElement = document.querySelector('.todos');
	const newTodoElement = document.querySelector('.newtodo input[type="text"]');

	todoCheckBoxElement.forEach((checkbox) => {
		checkbox.addEventListener('click', () => {
			if (checkbox.classList.contains('checked')) {
				checkbox.classList.remove('checked');
				checkbox.innerHTML = '';
				return;
			}

			checkbox.classList.add('checked');

			// Creating checked image element
			const imgElement = document.createElement('img');
			imgElement.setAttribute('src', './images/icon-check.svg');
			checkbox.appendChild(imgElement);
		});
	});

	newTodoElement.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' && newTodoElement.value !== '') {
			const newTodo = document.createElement('div');
			newTodo.classList.add('todo');
			newTodo.innerHTML = `<div class="checkbox" data-id="${uuidv4()}"></div><p>${
				newTodoElement.value
			}</p><img src="./images/icon-cross.svg" alt="close-todo"/>`;

			todosElement.appendChild(newTodo);

			// Clear input
			newTodoElement.value = '';

			// Add a click event listener to the newly created .todo element
			newTodo.querySelector('.checkbox').addEventListener('click', () => {
				toggleCheckbox(newTodo.querySelector('.checkbox'));
			});

			todoStateElement.style.display = 'flex';
		}
	});

	// Function to toggle the checkbox
	function toggleCheckbox(checkbox) {
		if (checkbox.classList.contains('checked')) {
			checkbox.classList.remove('checked');
			checkbox.innerHTML = '';
			return;
		}

		checkbox.classList.add('checked');

		// Creating checked image element
		const imgElement = document.createElement('img');
		imgElement.setAttribute('src', './images/icon-check.svg');
		checkbox.appendChild(imgElement);
	}

	function removeElement(element) {
		element.remove();
	}
});
