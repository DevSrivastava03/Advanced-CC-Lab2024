document.addEventListener('DOMContentLoaded', fetchKanyeData);

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

async function fetchKanyeData() {
    try {
        const response = await fetch('https://api.kanye.rest');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayKanyeData(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayKanyeData(data) {
    const kanyeQuote = document.createElement('div');
    const randomColor = generateRandomColor();
    kanyeQuote.innerHTML = `
        <p class="quote">${data.quote}</p>
    `;
    document.body.style.backgroundColor = randomColor; // Set background color
    document.body.appendChild(kanyeQuote);
}

function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const mcqForm = document.getElementById('mcqForm');
mcqForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(mcqForm);
    let score = 0;
    formData.forEach((value) => {
        if (value === 'medicine' || value === 'jonah hill' || value === 'drake video' || value === 'clothes') {
            score++;
        }
    });
    window.location.reload();
});
