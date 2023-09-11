// Targetting elements
const adviceContainer = document.querySelector('.advice');
const advice = document.querySelector('.advice span');
const adviceBtn = document.querySelector('.change-advice-btn');
const adviceId = document.querySelector('.advice-num span');

const url = 'https://api.adviceslip.com/advice';

const fetchAdvice = async (url) => {
	try {
		adviceBtn.disabled = true;
		const res = await fetch(url);
		const data = await res.json();

		adviceBtn.disabled = false;
		advice.textContent = data.slip.advice;
		adviceId.textContent = data.slip.id;

		localStorage.setItem('adviceslip', JSON.stringify(data));
	} catch (error) {
		console.error(error);
	}
};

const adviceData = JSON.parse(localStorage.getItem('adviceslip'));

// Loading advice into the container.
if (adviceData && adviceData.slip.advice) {
	advice.textContent = adviceData?.slip.advice;
	adviceId.textContent = adviceData?.slip.id;
}

adviceBtn.addEventListener('click', () => {
	fetchAdvice(url);
});

fetchAdvice(url);
