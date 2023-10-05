export function scrollToBottom() {
	const commentsContainer = document.querySelector('.comments-container');
	// Scroll all the way to the bottom
	commentsContainer.scrollTop = commentsContainer.scrollHeight;
}
export function createCommentElement(
	score,
	image,
	username,
	createdDate,
	commentContent,
	isUser = false
) {
	const commentsContainer = document.querySelector('.comments-container');
	const commentElement = document.createElement('div');
	commentElement.classList.add('comment');

	if (isUser) {
		commentElement.classList.add('my-comment');
	}

	commentElement.innerHTML = `
         <div class="vote-comment">
            <div class="vote-wrapper">
               <div class="upvote">
                  <img src="./images/icon-plus.svg" alt="upvote-comment" />
               </div>
               <p class="vote-number">${score}</p>
               <div class="downvote">
                  <img src="./images/icon-minus.svg" alt="upvote-comment" />
               </div>
            </div>
         </div>
         <div class="user">
            <div class="user-img">
               <img src="${image}" alt="user-img" />
            </div>
            <div class="user-name">
               ${username}
            </div>
            <div class="comment-created">
               <p>${createdDate}</p>
            </div>
         </div>
         <div class="reply">
            <img src="./images/icon-reply.svg" alt="reply" />
            <p>Reply</p>
         </div>
         <div class="comment-content">
            ${commentContent}
         </div>
      `;

	if (commentElement.classList.contains('my-comment')) {
		const userElement = commentElement.querySelector('.user');

		const youElement = document.createElement('div');
		youElement.classList.add('you-tag');
		youElement.textContent = 'you';

		userElement.insertBefore(
			youElement,
			userElement.querySelector('.comment-created')
		);

		// Delete Button
		const deleteBtn = document.createElement('div');
		deleteBtn.classList.add('delete-comment');
		deleteBtn.innerHTML = `
         <img src="./images/icon-delete.svg" alt="delete" />
         <p>Delete</p>
      `;

		let hasClickedDialog = false;
		deleteBtn.addEventListener('click', () => {
			if (!hasClickedDialog) {
				hasClickedDialog = true;
				const dialogElement = document.createElement('dialog');
				dialogElement.classList.add('confirm-delete-dialog');

				document.querySelector('body').append(dialogElement);

				dialogElement.innerHTML = `
					<h1>Delete Comment</h1>
					<p>Are you sure you want to delete this commnet? This will remove the comment and can't be undone.</p>
					<div class="dialog-delete-confirm">
						<button class="cancel-btn">No, Cancel</button>
						<button class="delete-btn">Yes, Delete</button>
					</div>
				`;
				dialogElement.showModal();

				dialogElement.querySelector('.cancel-btn').addEventListener('click', () => {
					dialogElement.close();
					dialogElement.remove();
					hasClickedDialog = false;
				});

				dialogElement.querySelector('.delete-btn').addEventListener('click', () => {
					if (commentElement.parentElement.childElementCount === 1) {
						commentElement.parentElement.remove();
					} else {
						commentElement.remove();
					}

					dialogElement.close();
					dialogElement.remove();
					hasClickedDialog = false;
				});
			}
		});

		// Edit Button
		const editBtn = document.createElement('div');
		editBtn.classList.add('edit-comment');
		editBtn.innerHTML = `
         <img src="./images/icon-edit.svg" alt="edit" />
         <p>Edit</p>
      `;
		editBtn.addEventListener('click', () => {
			const updateComment = document.createElement('textarea');
			const updateBtn = document.createElement('div');
			const commentContentElement =
				commentElement.querySelector('.comment-content');

			// Updating styling
			commentContentElement.style.display = 'none';
			updateBtn.classList = 'update-comment-btn';
			updateBtn.textContent = 'update';

			commentElement.appendChild(updateComment);
			commentElement.appendChild(updateBtn);

			commentsContainer.scrollTop = commentElement.parentElement.scrollHeight;

			updateBtn.addEventListener('click', () => {
				if (updateComment.value.trim() === '') return;

				// Update user comment value
				commentContentElement.textContent = updateComment.value;

				// Update styling
				updateComment.remove();
				updateBtn.remove();
				commentContentElement.style = 'block';
			});
		});

		commentElement.appendChild(deleteBtn);
		commentElement.appendChild(editBtn);
	}

	const voteWrapper = commentElement.querySelector('.vote-wrapper');
	const upvote = voteWrapper.querySelector('.upvote');
	const downvote = voteWrapper.querySelector('.downvote');
	const voteNumber = voteWrapper.querySelector('.vote-number');
	let hasUpvote = false;
	let hasDownvote = false;

	upvote.addEventListener('click', () => {
		if (!hasUpvote && !hasDownvote) {
			voteNumber.textContent = parseInt(voteNumber.textContent) + 1;
			hasUpvote = true;
		} else if (!hasUpvote && hasDownvote) {
			voteNumber.textContent = parseInt(voteNumber.textContent) + 1;
			hasDownvote = false;
		}
	});

	downvote.addEventListener('click', () => {
		if (!hasDownvote && !hasUpvote) {
			voteNumber.textContent = parseInt(voteNumber.textContent) - 1;
			hasDownvote = true;
		} else if (!hasDownvote && hasUpvote) {
			voteNumber.textContent = parseInt(voteNumber.textContent) - 1;
			hasUpvote = false;
		}
	});

	return commentElement;
}
