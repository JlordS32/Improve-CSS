// Import the autoAnimate function and some utility functions
import autoAnimate from 'https://cdn.jsdelivr.net/npm/@formkit/auto-animate@1.0.0-beta.1/index.min.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { scrollToBottom, createCommentElement } from './createComment.js';

// Function to load and parse JSON data from a file
async function loadJSON() {
	try {
		const response = await fetch('data.json'); // Fetch JSON data from 'data.json' file
		const data = await response.json(); // Parse the JSON response
		return data; // Return the parsed JSON data
	} catch (error) {
		console.error('Error loading JSON:', error); // Log an error if JSON loading fails
		return null; // Return null in case of an error
	}
}

// Function to sanitize HTML strings
function sanitizeHTML(str) {
	const div = document.createElement('div');
	div.textContent = str;
	return div.innerHTML;
}

function createReplyContainer(currentUser, user) {
	const newReplyContainer = document.createElement('div'); // Create a new div for the reply container
	newReplyContainer.classList.add('new-reply-container'); // Add a CSS class to the reply container
	newReplyContainer.innerHTML = `
               <img src=${currentUser.image.png} alt="${currentUser.username}"/>
               <textarea id="new-reply" placeholder="Enter reply here...">@${user.username}</textarea>
               <button>Reply</button>
               `;

	return newReplyContainer;
}

function handleReplies(newComment, commentWrapper, currentUser, user) {
	const replyElement = newComment.querySelector('.reply'); // Select the reply button in the new comment
	let hasReplied = false;

	// Event listener for when the reply button is clicked
	replyElement.addEventListener('click', () => {
		if (!hasReplied) {
			hasReplied = true;

			const newReplyContainer = createReplyContainer(currentUser, user);

			const replyBtn = newReplyContainer.querySelector('button'); // Select the reply button in the reply container

			commentWrapper.appendChild(newReplyContainer); // Append the reply container to the comment

			// Event listener for when the reply button in the reply container is clicked
			replyBtn.addEventListener('click', () => {
				newReplyContainer.remove(); // Remove the reply container

				let replyContainer = commentWrapper.querySelector('.reply-container');

				if (!replyContainer) {
					replyContainer = document.createElement('div'); // Create a new div for the replies container
					replyContainer.classList.add('reply-container'); // Add a CSS class to the replies container
				}

				const newReplyInput = newReplyContainer.querySelector('textarea').value; // Get the text from the reply textarea

				// Create a new reply comment element using the createCommentElement function
				const newReply = createCommentElement(
					0,
					currentUser.image.png,
					currentUser.username,
					'2 days ago',
					sanitizeHTML(newReplyInput),
					true
				);

				newReply.classList.add('comment-reply');

				newReply.setAttribute(
					'data-reply-for',
					commentWrapper.getAttribute('data-id')
				);

				hasReplied = false;

				replyContainer.appendChild(newReply); // Append the reply to the reply container
				commentWrapper.appendChild(replyContainer); // Append the reply container to the comment
			});
		}
	});
}

// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', async () => {
	const commentsContainer = document.querySelector('.comments-container'); // Select the comments container element
	autoAnimate(commentsContainer); // Apply auto-animation to the comments container

	const newCommentBtn = document.querySelector('.my-comment-container button'); // Select the new comment button
	const newCommentInput = document.querySelector(
		'.my-comment-container textarea'
	); // Select the new comment textarea

	const data = await loadJSON(); // Load JSON data asynchronously
	const { currentUser, comments } = data; // Destructure data into currentUser and comments

	// Iterate over each comment in the JSON data
	comments.forEach((comment) => {
		const commentWrapper = document.createElement('div'); // Create a new div for the comment
		autoAnimate(commentWrapper); // Apply auto-animation to the comment wrapper
		commentWrapper.classList.add('comment-wrapper'); // Add a CSS class to the comment wrapper
		commentWrapper.setAttribute('data-id', uuidv4());

		const { score, user, createdAt, content, replies } = comment; // Destructure comment data

		// Create a new comment element using the createCommentElement function
		const newComment = createCommentElement(
			score,
			user.image.png,
			user.username,
			createdAt,
			content
		);

		// Handle replies
		handleReplies(newComment, commentWrapper, currentUser, user);

		commentWrapper.appendChild(newComment); // Append the new comment to the comment wrapper
		commentsContainer.appendChild(commentWrapper); // Append the comment wrapper to the comments container

		// Create reply elements for each reply in the comment's replies array
		if (replies.length > 0) {
			const replyContainer = document.createElement('div'); // Create a new div for the replies container
			replyContainer.classList.add('reply-container'); // Add a CSS class to the replies container
			autoAnimate(replyContainer);
         let hasReplied = false;

			replies.forEach((reply) => {
				// Create a new reply comment element using the createCommentElement function
				const newReply = createCommentElement(
					reply.score,
					reply.user.image.png,
					reply.user.username,
					reply.createdAt,
					reply.content
				);

				newReply.classList.add('comment-reply');
				newReply.setAttribute(
					'data-reply-for',
					commentWrapper.getAttribute('data-id')
				);

				newReply.querySelector('.reply').addEventListener('click', () => {

					if (!hasReplied) {
                  hasReplied = true;
						const newReplyContainer = createReplyContainer(currentUser, reply.user);
						const replyBtn = newReplyContainer.querySelector('button');

						replyBtn.addEventListener('click', () => {
							newReplyContainer.remove();
                     hasReplied = false;

							let replyContainer =
								commentWrapper.querySelector('.reply-container');

							const newReplyInput =
								newReplyContainer.querySelector('textarea').value;

							// Create a new reply comment element using the createCommentElement function
							const newReplyElement = createCommentElement(
								0,
								currentUser.image.png,
								currentUser.username,
								'2 days ago',
								sanitizeHTML(newReplyInput),
								true
							);

							newReplyElement.classList.add('comment-reply');

							newReplyElement.setAttribute(
								'data-reply-for',
								commentWrapper.getAttribute('data-id')
							);

                     replyContainer.insertBefore(
                        newReplyElement,
                        newReply.nextSibling
                     );
						});

						replyContainer.insertBefore(
							newReplyContainer,
							newReply.nextSibling
						);
					}
					scrollToBottom();
				});

				replyContainer.appendChild(newReply); // Append the reply to the replies container
			});

			commentWrapper.appendChild(replyContainer); // Append the replies container to the comment
		}
	});

	// Event listener for when the new comment button is clicked
	newCommentBtn.addEventListener('click', () => {
		const commentsContainer = document.querySelector('.comments-container'); // Select the comments container
		const commentWrapper = document.createElement('div'); // Create a new div for the comment
		commentWrapper.classList.add('comment-wrapper'); // Add a CSS class to the comment wrapper
		commentWrapper.setAttribute('data-id', uuidv4());

		if (newCommentInput.value.trim() == '') return; // If the comment input is empty, return

		// Create a new comment element using the createCommentElement function
		const newComment = createCommentElement(
			0,
			currentUser.image.png,
			currentUser.username,
			'2 days ago',
			sanitizeHTML(newCommentInput.value),
			true
		);

		commentWrapper.appendChild(newComment); // Append the new comment to the comment wrapper
		commentsContainer.appendChild(commentWrapper); // Append the comment wrapper to the comments container

		scrollToBottom(); // Scroll to the bottom of the comments container

		// Clear input
		newCommentInput.value = ''; // Clear the comment input field
	});
});
