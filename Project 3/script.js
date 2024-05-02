const apiUrl = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
let currentQuestionIndex = 0;
let questions = [];
let correctAnswers = 0;
let incorrectAnswers = 0;
let myChart;

async function fetchQuestions() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        questions = data.results;
        displayQuestion();
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");

    questionElement.textContent = currentQuestion.question;

    choicesElement.innerHTML = "";
    currentQuestion.incorrect_answers.forEach((choice) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.classList.add("btn");
        button.addEventListener("click", () => {
            handleAnswer(false);
        });
        choicesElement.appendChild(button);
    });
    const correctButton = document.createElement("button");
    correctButton.textContent = currentQuestion.correct_answer;
    correctButton.classList.add("btn");
    correctButton.addEventListener("click", () => {
        handleAnswer(true);
    });
    choicesElement.appendChild(correctButton);
}

function handleAnswer(isCorrect) {
    if (isCorrect) {
        correctAnswers++;
    } else {
        incorrectAnswers++;
    }
    updateChart();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        alert("Quiz finished!");
        currentQuestionIndex = 0; // Reset quiz
        correctAnswers = 0; // Reset correct answers
        incorrectAnswers = 0; // Reset incorrect answers
        updateChart(); // Update chart
        fetchQuestions(); // Fetch new questions for the next quiz
    }
}

function updateChart() {
    if (!myChart) {
        const ctx = document.getElementById("myChart").getContext("2d");
        myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Correct", "Incorrect"],
                datasets: [{
                    label: "Answers",
                    data: [correctAnswers, incorrectAnswers],
                    backgroundColor: ["green", "red"]
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        myChart.data.datasets[0].data = [correctAnswers, incorrectAnswers];
        myChart.update();
    }
}

document.getElementById("nextButton").addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        alert("No more questions!");
    }
});

fetchQuestions();
