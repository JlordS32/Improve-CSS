// Import the autoAnimate function and some utility functions
import autoAnimate from 'https://cdn.jsdelivr.net/npm/@formkit/auto-animate@1.0.0-beta.1/index.min.js';
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

// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', async () => {
	const commentsContainer = document.querySelector('.comments-container'); // Select the comments container element
	autoAnimate(commentsContainer); // Apply auto-animation to the comments container

	const newCommentBtn = document.querySelector('.my-comment-container button'); // Select the new comment button
	const newCommentInput = document.querySelector('.my-comment-container textarea'); // Select the new comment textarea

	const data = await loadJSON(); // Load JSON data asynchronously
	const { currentUser, comments } = data; // Destructure data into currentUser and comments

	// Iterate over each comment in the JSON data
	comments.forEach((comment) => {
		const commentWrapper = document.createElement('div'); // Create a new div for the comment
		autoAnimate(commentWrapper); // Apply auto-animation to the comment wrapper
		commentWrapper.classList.add('comment-wrapper'); // Add a CSS class to the comment wrapper

		const { score, user, createdAt, content, replies } = comment; // Destructure comment data

		// Create a new comment element using the createCommentElement function
		const newComment = createCommentElement(
			score,
			user.image.png,
			user.username,
			createdAt,
			content
		);

		const replyElement = newComment.querySelector('.reply'); // Select the reply button in the new comment

		// Event listener for when the reply button is clicked
		replyElement.addEventListener('click', () => {
			const newReplyContainer = document.createElement('div'); // Create a new div for the reply container
			newReplyContainer.classList.add('new-reply-container'); // Add a CSS class to the reply container
			newReplyContainer.innerHTML = `
            <img src=${currentUser.image.png} alt="${currentUser.username}"/>
            <textarea id="new-reply" placeholder="Enter reply here...">@${user.username}</textarea>
            <button>Reply</button>
         `; // HTML content for the reply container

			const replyBtn = newReplyContainer.querySelector('button'); // Select the reply button in the reply container

			commentWrapper.appendChild(newReplyContainer); // Append the reply container to the comment

			// Event listener for when the reply button in the reply container is clicked
			replyBtn.addEventListener('click', () => {
				newReplyContainer.remove(); // Remove the reply container

				const replyContainer = document.createElement('div'); // Create a new div for the reply
				replyContainer.classList.add('reply-container'); // Add a CSS class to the reply container
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

				replyContainer.appendChild(newReply); // Append the reply to the reply container
				commentWrapper.appendChild(replyContainer); // Append the reply container to the comment
			});
		});

		commentWrapper.appendChild(newComment); // Append the new comment to the comment wrapper
		commentsContainer.appendChild(commentWrapper); // Append the comment wrapper to the comments container

		// Create reply elements for each reply in the comment's replies array
		if (replies.length > 0) {
			const replyContainer = document.createElement('div'); // Create a new div for the replies container
			replyContainer.classList.add('reply-container'); // Add a CSS class to the replies container

			replies.forEach((reply) => {
				// Create a new reply comment element using the createCommentElement function
				const newReply = createCommentElement(
					reply.score,
					reply.user.image.png,
					reply.user.username,
					reply.createdAt,
					reply.content
				);

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
