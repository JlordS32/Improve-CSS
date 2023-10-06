import autoAnimate from 'https://cdn.jsdelivr.net/npm/@formkit/auto-animate@1.0.0-beta.1/index.min.js';

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

document.addEventListener('DOMContentLoaded', async () => {
	const jobContainer = document.querySelector('.job-container');
	const data = await loadJSON();
   const selectedSearchTags = [];
   autoAnimate(jobContainer);

	data.forEach((jobListing) => {
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
		} = jobListing;

		const jobListingElement = document.createElement('div');
		jobListingElement.classList.add('job-listing');
		jobListingElement.setAttribute('data-id', id);

		jobListingElement.innerHTML = `
         <div class="company-logo">
            <img src="${logo}" alt="${company}" />
         </div>

         <div class="job-info">
            <div class="employer-info">
               <div class="job-company">${company}</div>
               ${jobListing.new ? '<span class="new">New!</span>' : ''}
               ${
									jobListing.featured
										? '<span class="featured">Featured</span>'
										: ''
								}
            </div>
            <div class="job-title">
               <h1>${position}</h1>
            </div>
            <div class="job-meta">
               <div class="posted-at">${postedAt}</div>
               <div class="contract">${contract}</div>
               <div class="level">${level}</div>
            </div>
         </div>

         <div class="jobtags">
            ${
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

		if (jobListing.new && jobListing.featured) {
			jobListingElement.style.borderLeft = '4px solid hsl(180, 29%, 50%)';
		}
		jobListingElement.addEventListener('click', (event) => {
			const clickedTag = event.target.closest('.tag');

			if (clickedTag) {
				const tagText = clickedTag.innerText;

				if (!selectedSearchTags.includes(tagText)) {
					selectedSearchTags.push(tagText);
					console.log(selectedSearchTags);
				}
			}

			if (!jobContainer.querySelector('.filter')) {
				const filterElement = document.createElement('div');
				const clearBtn = document.createElement('button');
				const searchTagsContainer = document.createElement('div');

				filterElement.classList.add('filter');
				searchTagsContainer.classList.add('search-tags');
				clearBtn.textContent = 'Clear';

			   searchTagsContainer.innerHTML = `
			      ${selectedSearchTags.map(tag => {
			         return `
			            <div class="search-tag">
			               <span>${tag}</span>
			               <button>
			                  <img src="images/icon-remove.svg" alt="remove-tag" />
			               </button>
			            </div>
			         `
			      }).join('')}
			   `
				filterElement.appendChild(searchTagsContainer);
			   filterElement.appendChild(clearBtn);
				jobContainer.insertBefore(filterElement, jobContainer.firstChild);
			} else {
			   const searchTagsContainer = jobContainer.querySelector('.search-tags');

			   searchTagsContainer.innerHTML = `
			      ${selectedSearchTags.map(tag => {
			         return `
			            <div class="search-tag">
			               <span>${tag}</span>
			               <button>
			                  <img src="images/icon-remove.svg" alt="remove-tag" />
			               </button>
			            </div>
			         `
			      }).join('')}
			   `
			}
		});

		jobContainer.appendChild(jobListingElement);
	});
});
