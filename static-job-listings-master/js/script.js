// Import the 'auto-animate' library from a CDN
import autoAnimate from 'https://cdn.jsdelivr.net/npm/@formkit/auto-animate@1.0.0-beta.1/index.min.js';

// Function to load JSON data from 'data.json' file
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

// Function to update filters based on user selections
function updateFilters(selectedFilters, jobContainer) {
	// Loop through your job listings
	jobContainer.querySelectorAll('.job-listing').forEach((jobListing) => {
		// Check if the job listing matches the selected filters
		const jobTags = jobListing.querySelectorAll('.tag');
		const shouldShow = Array.from(jobTags).some((tag) =>
			selectedFilters.includes(tag.innerText)
		);

		// Toggle the CSS class to show or hide the job listing
		jobListing.classList.toggle('filtered-out', !shouldShow);
	});
}

// Execute code when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
	const jobContainer = document.querySelector('.job-container'); // Get the job container element
	const data = await loadJSON(); // Load JSON data asynchronously
	let selectedSearchTags = []; // Initialize an array to store selected search tags

	// Initialize auto-animation for the job container
	autoAnimate(jobContainer);

	// Loop through the JSON data and create job listing elements
	data.forEach((jobListing) => {
		// Destructure properties from the job listing data
		const {
			company,
			contract,
			id,
			languages,
			level,
			logo,
			position,
			postedAt,
			role,
			tools,
			new: isNew, // 'new' is a reserved keyword, so alias it to 'isNew'
			featured,
		} = jobListing;

		// Create a new job listing element
		const jobListingElement = document.createElement('div');
		jobListingElement.classList.add('job-listing'); // Add a class to the job listing element
		jobListingElement.setAttribute('data-id', id); // Set a data attribute

		// Populate the HTML content of the job listing element
		jobListingElement.innerHTML = `
            <!-- Company Logo -->
            <div class="company-logo">
                <img src="${logo}" alt="${company}" />
            </div>

            <!-- Job Information -->
            <div class="job-info">
                <!-- Employer Information -->
                <div class="employer-info">
                    <div class="job-company">${company}</div>
                    ${isNew ? '<span class="new">New!</span>' : ''}
                    ${featured ? '<span class="featured">Featured</span>' : ''}
                </div>
                <div class="job-title">
                    <h1>${position}</h1>
                </div>

                <!-- Job Metadata -->
                <div class="job-meta">
                    <div class="posted-at">${postedAt}</div>
                    <div class="contract">${contract}</div>
                    <div class="level">${level}</div>
                </div>
            </div>

            <!-- Job Tags -->
            <div class="jobtags">
                ${
									// Generate HTML for tool tags
									tools && tools.length > 0
										? tools
												.map((tool) => {
													return `
                            <span class="tag tool">
                                ${tool}
                            </span>
                        `;
												})
												.join('')
										: ''
								}
                ${
									// Generate HTML for language tags
									languages && languages.length > 0
										? languages
												.map((language) => {
													return `
                            <span class="tag tool">
                                ${language}
                            </span>
                        `;
												})
												.join('')
										: ''
								}
                <span class="tag role">
                    ${role}
                </span>
            </div>
        `;

		// Add a border to job listings that are both 'new' and 'featured'
		if (isNew && featured) {
			jobListingElement.style.borderLeft = '4px solid hsl(180, 29%, 50%)';
		}

		// Add a click event listener to the job listing element
		jobListingElement.querySelectorAll('.tag').forEach((tagElement) => {
			tagElement.addEventListener('click', () => {
            
            const tagText = tagElement.innerText;

            if (!selectedSearchTags.includes(tagText)) {
               selectedSearchTags.push(tagText); // Add the selected tag to the array
               updateFilters(selectedSearchTags, jobContainer); // Update filters based on selected tags
            }

				if (!jobContainer.querySelector('.filter')) {
					const filterElement = document.createElement('div');
					const clearBtn = document.createElement('button');
					const searchTagsContainer = document.createElement('div');

					// Add classes and content to the filter element
					filterElement.classList.add('filter');
					searchTagsContainer.classList.add('search-tags');
					clearBtn.textContent = 'Clear';

					// Populate the HTML content of the search tags container
					searchTagsContainer.innerHTML = `
                    ${selectedSearchTags
											.map((tag) => {
												return `
                                <div class="search-tag">
                                    <span>${tag}</span>
                                    <button>
                                        <img src="images/icon-remove.svg" alt="remove-tag" />
                                    </button>
                                </div>
                            `;
											})
											.join('')}
                `;

					// Add a click event listener to each remove button
					const searchTagElements =
						searchTagsContainer.querySelectorAll('.search-tag');
					searchTagElements.forEach((searchTagElement) => {
						searchTagElement
							.querySelector('button')
							.addEventListener('click', () => {
								const selectedTag = searchTagElement
									.querySelector('span')
									.innerText.toString();
								selectedSearchTags = selectedSearchTags.filter(
									(tag) => tag !== selectedTag
								);
								searchTagElement.remove(); // Remove the clicked search tag
								updateFilters(selectedSearchTags, jobContainer); // Update filters
							});
					});

					// Append filter elements to the job container
					filterElement.appendChild(searchTagsContainer);
					filterElement.appendChild(clearBtn);
					jobContainer.insertBefore(filterElement, jobContainer.firstChild);
				} else {
					const searchTagsContainer =
						jobContainer.querySelector('.search-tags');

					// Update the HTML content of the search tags container
					searchTagsContainer.innerHTML = `
                    ${selectedSearchTags
											.map((tag) => {
												return `
                                <div class="search-tag">
                                    <span>${tag}</span>
                                    <button>
                                        <img src="images/icon-remove.svg" alt="remove-tag" />
                                    </button>
                                </div>
                            `;
											})
											.join('')}
                `;

					// Add a click event listener to each remove button
					const searchTagElements =
						searchTagsContainer.querySelectorAll('.search-tag');
					searchTagElements.forEach((searchTagElement) => {
						searchTagElement
							.querySelector('button')
							.addEventListener('click', () => {
								const selectedTag = searchTagElement
									.querySelector('span')
									.innerText.toString();
								selectedSearchTags = selectedSearchTags.filter(
									(tag) => tag !== selectedTag
								);
								searchTagElement.remove(); // Remove the clicked search tag
								updateFilters(selectedSearchTags, jobContainer); // Update filters
							});
					});
				}

				console.log('cic');
				updateFilters(selectedSearchTags, jobContainer);
			});
		});

		// Append the job listing element to the job container
		jobContainer.appendChild(jobListingElement);
	});
});
