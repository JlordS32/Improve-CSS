import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import autoAnimate from 'https://cdn.jsdelivr.net/npm/@formkit/auto-animate@1.0.0-beta.1/index.min.js';

// Function to load and parse JSON data from a file
async function loadJSON() {
	try {
		const response = await fetch('data.json');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error loading JSON:', error);
		return null;
	}
}

function scrollToBottom() {
	const commentsContainer = document.querySelector('.comments-container');
	// Scroll all the way to the bottom
	commentsContainer.scrollTop = commentsContainer.scrollHeight;
}

function createCommentElement(
	score,
	image,
	username,
	createdDate,
	commentContent,
	isUser = false
) {
	const commentWrapper = document.createElement('div');
	const commentElement = document.createElement('div');
	const commentsContainer = document.querySelector('.comments-container');
   
	commentWrapper.classList.add('comment-wrapper');
	commentElement.classList.add('comment');
	commentElement.setAttribute('data-id', uuidv4());

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
		deleteBtn.addEventListener('click', () => {
			commentWrapper.remove();
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

			scrollToBottom();

			updateBtn.addEventListener('click', () => {
				if (updateComment.value.trim() === '') return;

				// Update user comment value
				commentContentElement.textContent = updateComment.value;

				// Update styling
				updateComment.style.display = 'none';
				updateBtn.style.display = 'none';
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
   })

   downvote.addEventListener('click', () => {
      if (!hasDownvote && !hasUpvote) {
         voteNumber.textContent = parseInt(voteNumber.textContent) - 1;
         hasDownvote = true;
      } else if (!hasDownvote && hasUpvote) {
         voteNumber.textContent = parseInt(voteNumber.textContent) - 1;
         hasUpvote = false;
      }
   })

	commentWrapper.appendChild(commentElement);
	commentsContainer.appendChild(commentWrapper);
}

function sanitizeHTML(str) {
	const div = document.createElement('div');
	div.textContent = str;
	return div.innerHTML;
}
document.addEventListener('DOMContentLoaded', async () => {
	const commentsContainer = document.querySelector('.comments-container');
	autoAnimate(commentsContainer);

	const newCommentBtn = document.querySelector('.my-comment-container button');
	const newCommentInput = document.querySelector(
		'.my-comment-container textarea'
	);

	const data = await loadJSON();
	const { currentUser, comments } = data;

	comments.forEach((comment) => {
		const { score, user, createdAt, content } = comment;

		createCommentElement(
			score,
			user.image.png,
			user.username,
			createdAt,
			content
		);
	});

	newCommentBtn.addEventListener('click', () => {
		if (newCommentInput.value.trim() == '') return;

		createCommentElement(
			0,
			currentUser.image.png,
			currentUser.username,
			'2 days ago',
			sanitizeHTML(newCommentInput.value),
			true
		);

		scrollToBottom();

		// Clear input
		newCommentInput.value = '';
	});
});
