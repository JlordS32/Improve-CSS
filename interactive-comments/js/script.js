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

document.addEventListener('DOMContentLoaded', async () => {
	const commentsContainer = document.querySelector('.comments-container');

	const data = await loadJSON();
	const { currentUser, comments } = data;

	comments.forEach((comment) => {
		const commentElement = document.createElement('div');
		commentElement.classList.add('comment');
		commentElement.setAttribute('data-id', uuidv4());
		commentElement.innerHTML = `
         <div class="vote-comment">
            <div class="vote-wrapper">
               <img src="./images/icon-plus.svg" alt="upvote-comment" />
               <p class="vote-number">${comment.score}</p>
               <img src="./images/icon-minus.svg" alt="upvote-comment" />
            </div>
         </div>
         <div class="wrapper"> 
            <div class="commenter"> 
               <div class="user">
                  <div class="user-img">
                     <img src="${comment.user.image.png}" alt="user-img" />
                  </div>
                  <div class="user-name">
                     ${comment.user.username}
                  </div>
                  <div class="user-comment-data">
                     <p>${comment.createdAt}</p>
                  </div>
               </div>
               <div class="reply">
                  <img src="./images/icon-reply.svg" alt="reply" />
                  <p>Reply</p>
               </div>
            </div>
            <div class="comment-content">
               ${comment.content}
            </div>
         </div>
      `;

		commentsContainer.appendChild(commentElement);
	});
});
