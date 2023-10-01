import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import autoAnimate from 'https://cdn.jsdelivr.net/npm/@formkit/auto-animate@1.0.0-beta.1/index.min.js';

document.addEventListener('DOMContentLoaded', () => {
	const todoCheckBoxElement = document.querySelectorAll('.todo div');
	const todoStateElement = document.querySelector('.todo-state-container');
	const todosElement = document.querySelector('.todos');
	const newTodoElement = document.querySelector('.newtodo input[type="text"]');

   autoAnimate(document.querySelector('.todos'));

	todoCheckBoxElement.forEach((checkbox) => {
		checkbox.addEventListener('click', () => {
			toggleCheckbox(checkbox);
		});
	});

	newTodoElement.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' && newTodoElement.value !== '') {
			const newTodo = document.createElement('div');
			newTodo.classList.add('todo');
			newTodo.setAttribute('data-id', uuidv4());
			newTodo.innerHTML = `<div class="checkbox"></div><p>${newTodoElement.value}</p><img src="./images/icon-cross.svg" alt="close-todo"/>`;

			todosElement.appendChild(newTodo);

			// Clear input
			newTodoElement.value = '';

			// Add a click event listener to the newly created .todo element
			newTodo.querySelector('.checkbox').addEventListener('click', () => {
				toggleCheckbox(newTodo.querySelector('.checkbox'));
			});

			newTodo.querySelector('img').addEventListener('click', () => {
				newTodo.remove();
			});

			todoStateElement.style.display = 'flex';
			todoStateElement.style.boxShadow = '0px 40px 40px 24px rgba(0,0,0,0.1)';
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
		imgElement.classList.add('animate--fast');
		imgElement.classList.add('fadeIn');
		checkbox.appendChild(imgElement);
	}
});
