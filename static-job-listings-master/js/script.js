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

document.addEventListener('DOMContentLoaded', () => {
   
})