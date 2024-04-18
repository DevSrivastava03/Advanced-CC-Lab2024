document.addEventListener('DOMContentLoaded', fetchRandomQuote);

const correctFeedbackDiv = document.getElementById('correctFeedback');
const incorrectFeedbackDiv = document.getElementById('incorrectFeedback');
const mcqForm = document.getElementById('mcqForm');

mcqForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(mcqForm);
    const userAnswer = formData.get('answer');
    const correctAnswer = determineCorrectAnswer();

    // Provide feedback
    if (userAnswer === correctAnswer) {
        correctFeedbackDiv.textContent = 'Correct!';
        incorrectFeedbackDiv.textContent = ''; 
    } else {
        incorrectFeedbackDiv.textContent = 'Incorrect!';
        correctFeedbackDiv.textContent = ''; 
    }
    await fetchRandomQuote();
});

async function fetchRandomQuote() {
    const quoteContainer = document.getElementById('quoteContainer');
    try {
        const randomAPI = Math.random() < 0.5 ? 'kanye' : 'advice'; 
        let quote;
        if (randomAPI === 'kanye') {
            const kanyeData = await fetchData('https://api.kanye.rest');
            quote = kanyeData.quote;
        } else {
            const adviceData = await fetchData('https://api.adviceslip.com/advice');
            quote = adviceData.slip.advice;
        }
        quoteContainer.textContent = quote;
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
}

function determineCorrectAnswer() {
    const randomAPI = Math.random() < 0.5 ? 'kanye' : 'advice';
    return randomAPI;
}
