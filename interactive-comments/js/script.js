import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

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

function createCommentElement(
	score,
	image,
	username,
	createdDate,
	commentContent
) {
	const commentElement = document.createElement('div');
	const commentsContainer = document.querySelector('.comments-container');

	commentElement.classList.add('comment');
	commentElement.setAttribute('data-id', uuidv4());

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
         <div class="wrapper"> 
            <div class="commenter"> 
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
            </div>
            <div class="comment-content">
               ${commentContent}
            </div>
         </div>
      `;

	commentsContainer.appendChild(commentElement);
}

function sanitizeHTML(str) {
	const div = document.createElement('div');
	div.textContent = str;
	return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', async () => {
	const commentsContainer = document.querySelector('.comments-container');
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
		createCommentElement(
			0,
			currentUser.image.png,
			currentUser.username,
			'2 days ago',
			sanitizeHTML(newCommentInput.value)
		);
	});
});
