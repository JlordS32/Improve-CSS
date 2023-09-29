document.addEventListener('DOMContentLoaded', () => {
	const todoCheckBoxElement = document.querySelectorAll('.todo div');
   const todoStateElement = document.querySelector('.todo-state-container');
   const todosElement = document.querySelector('.todos');

   if (todosElement.childElementCount > 0) {
      todoStateElement.style.display = 'flex';
   }

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
});
