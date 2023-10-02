import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import autoAnimate from 'https://cdn.jsdelivr.net/npm/@formkit/auto-animate@1.0.0-beta.1/index.min.js';

// Function to show all todo items
function showAllTodoItems() {
	const todoItems = document.querySelectorAll('.todo');
	todoItems.forEach((item) => {
		item.style.display = 'flex';
	});
}

// Function to show only active (non-completed) todo items
function showActiveTodoItems() {
	const todoItems = document.querySelectorAll('.todo');
	todoItems.forEach((item) => {
		if (item.classList.contains('completed')) {
			item.style.display = 'none';
		} else {
			item.style.display = 'flex';
		}
	});
}

// Function to show only completed todo items
function showCompletedTodoItems() {
	const todoItems = document.querySelectorAll('.todo');
	todoItems.forEach((item) => {
		if (item.classList.contains('completed')) {
			item.style.display = 'flex';
		} else {
			item.style.display = 'none';
		}
	});
}

function clearCompletedTodoItems() {
	const todoItems = document.querySelectorAll('.todo');
	todoItems.forEach((item) => {
		if (item.classList.contains('completed')) {
			item.remove();
		}
	});
}

function handleThemeSwitch(darkMode) {
	const switchThemeElement = document.querySelector('.switch-theme');
	const iconElement = switchThemeElement.querySelector('img');
	const rootStyles = getComputedStyle(document.documentElement);

	// Colors

	const mainBgDark = rootStyles.getPropertyValue('--dark-very-dark-blue');
	const mainBgLight = rootStyles.getPropertyValue('--light-very-light-gray');

	if (darkMode) {
		iconElement.setAttribute('src', './images/icon-sun.svg');
		document.documentElement.style.setProperty('--main-bg', mainBgLight);
		document.documentElement.style.setProperty('--todo-container', 'white');
		document.documentElement.style.setProperty('--newtodo', 'white');
		document.documentElement.style.setProperty(
			'--text-color',
			'hsl(235, 21%, 11%)'
		);
		document.documentElement.style.setProperty(
			'--outline-col',
			'hsl(236, 33%, 92%)'
		);
		document.documentElement.style.setProperty(
			'--bottom-msg',
			'hsl(236, 9%, 61%)'
		);
	} else {
		iconElement.setAttribute('src', './images/icon-moon.svg');
		document.documentElement.style.setProperty('--main-bg', mainBgDark);
		document.documentElement.style.setProperty(
			'--todo-container',
			'hsl(235, 24%, 19%)'
		);
		document.documentElement.style.setProperty(
			'--newtodo',
			'hsl(235, 24%, 19%)'
		);
		document.documentElement.style.setProperty(
			'--text-color',
			'hsl(234, 39%, 85%)'
		);
		document.documentElement.style.setProperty(
			'--outline-col',
			'hsl(233, 14%, 35%)'
		);
		document.documentElement.style.setProperty(
			'--bottom-msg',
			'hsl(237, 14%, 26%)'
		);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const todoCheckBoxElement = document.querySelectorAll('.todo div');
	const todoStateElement = document.querySelector('.todo-state-container');
	const todosDragDrogMsgElement = document.querySelector('.tips');
	const todosElement = document.querySelector('.todos');
	const newTodoElement = document.querySelector('.newtodo input[type="text"]');
	const statesElement = document.querySelectorAll('.state');
	const clearElement = document.querySelector('.clear');
	const switchThemeElement = document.querySelector('.switch-theme');

	// Select the filter buttons
	const allButton = document.getElementById('all');
	const activeButton = document.getElementById('active');
	const completedButton = document.getElementById('completed');

	handleThemeSwitch(JSON.parse(localStorage.getItem('isDarkMode')));

	function updateRemainingItems() {
		const remainingItemElement = document.querySelector('.remaining-item');
		// Update remaining item element
		remainingItemElement.innerHTML = `<p>${todosElement.childElementCount} items left</p>`;
	}

	function disableStateElement() {
		todoStateElement.style.display = 'none';
		todoStateElement.style.boxShadow = '0';
		todosDragDrogMsgElement.style.display = 'none';
	}

	// Function to check what is the current after element
	function getDragAfterElement(container, y) {
		const draggableTodos = [
			...container.querySelectorAll('.todo:not(.dragging)'),
		];

		return draggableTodos.reduce(
			(closest, child) => {
				const box = child.getBoundingClientRect();
				const offset = y - box.top - box.height / 2;

				if (offset < 0 && offset > closest.offset) {
					return {
						offset: offset,
						element: child,
					};
				} else {
					return closest;
				}
			},
			{ offset: Number.NEGATIVE_INFINITY, element: null }
		).element; // Provide a default element value
	}

	// Function to toggle the checkbox
	function toggleCheckbox(checkbox, todo) {
		if (checkbox.classList.contains('checked')) {
			checkbox.classList.remove('checked');
			todo.classList.remove('completed');
			checkbox.innerHTML = '';
			return;
		}

		checkbox.classList.add('checked');
		todo.classList.add('completed');

		// Creating checked image element
		const imgElement = document.createElement('img');
		imgElement.setAttribute('src', './images/icon-check.svg');
		imgElement.classList.add('animate--fast');
		imgElement.classList.add('fadeIn');
		checkbox.appendChild(imgElement);
	}

	function updateBackgroundImage() {
		const mainElement = document.querySelector('main');
      const isDarkMode = localStorage.getItem('isDarkMode') || true;

      console.log(isDarkMode);

		if (window.innerWidth < 600) {
			mainElement.style.backgroundImage = `url('./images/bg-mobile-dark.jpg')`;
		} else {
         mainElement.style.backgroundImage = isDarkMode === true ? `url('./images/bg-desktop-light.jpg')` : `url('./images/bg-desktop-dark.jpg')`;
      }
	}

	// Initial setup when the page loads
	updateBackgroundImage();

	// Listen for the window resize event and update the background image accordingly
	window.addEventListener('resize', updateBackgroundImage);

	// Add click event listeners to the filter buttons
	allButton.addEventListener('click', () => {
		// Show all todo items
		showAllTodoItems();
	});

	activeButton.addEventListener('click', () => {
		// Show only active (non-completed) todo items
		showActiveTodoItems();
	});

	completedButton.addEventListener('click', () => {
		// Show only completed todo items
		showCompletedTodoItems();
	});

	clearElement.addEventListener('click', () => {
		clearCompletedTodoItems();
		updateRemainingItems();
		if (todosElement.childElementCount === 0) {
			disableStateElement();
		}
	});

	todoCheckBoxElement.forEach((checkbox) => {
		checkbox.addEventListener('click', () => {
			toggleCheckbox(checkbox);
		});
	});

	switchThemeElement.addEventListener('click', () => {
		const darkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;

		// Update the theme icon immediately based on the current darkMode value
		handleThemeSwitch(!darkMode);

		// Toggle the localStorage value
		localStorage.setItem('isDarkMode', !darkMode);
	});

	autoAnimate(document.querySelector('.todos'));

	statesElement?.forEach((state) => {
		state.addEventListener('click', () => {
			statesElement.forEach((state) => {
				state.classList.remove('active');
			});

			state.classList.add('active');
		});
	});
	newTodoElement.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' && newTodoElement.value !== '') {
			const newTodo = document.createElement('div');
			newTodo.classList.add('todo');
			newTodo.classList.add('animate');
			newTodo.classList.add('fadeIn');
			newTodo.setAttribute('draggable', 'true');
			newTodo.setAttribute('data-id', uuidv4());
			newTodo.innerHTML = `<div class="checkbox"></div><p>${newTodoElement.value}</p><img src="./images/icon-cross.svg" alt="close-todo"/>`;

			todosElement.appendChild(newTodo);

			// Update remaining items
			updateRemainingItems();

			// Clear input
			newTodoElement.value = '';

			// Add a click event listener to the newly created .todo element
			newTodo.querySelector('.checkbox').addEventListener('click', () => {
				toggleCheckbox(newTodo.querySelector('.checkbox'), newTodo);
			});

			newTodo.querySelector('img').addEventListener('click', () => {
				newTodo.remove();

				// Update remaining item element
				updateRemainingItems();

				if (document.querySelector('.todos').childElementCount === 0) {
					disableStateElement();
				}
			});

			newTodo.addEventListener('dragstart', () => {
				newTodo.classList.add('dragging');

				showNotDraggedTodoItems();
			});

			newTodo.addEventListener('dragend', () => {
				newTodo.classList.remove('dragging');

				showNotDraggedTodoItems();
			});

			todoStateElement.style.display = 'flex';
			todosDragDrogMsgElement.style.display = 'block';
		}
	});

	todosElement.addEventListener('dragover', (e) => {
		e.preventDefault();

		// Get after element
		const afterElement = getDragAfterElement(todosElement, e.clientY);

		// Get element current being dragged
		const draggable = document.querySelector('.dragging');

		// Insert dragged element before the after element;
		todosElement.insertBefore(draggable, afterElement);
	});
});
