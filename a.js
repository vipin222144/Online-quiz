const questions = [
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: " New Delhi", correct: true },
            { text: "Kolkata", correct: false },
            { text: "Chennai", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "Who wrote the Ramayana?",
        answers: [
            { text: "Ved Vyas", correct: false },
            { text: "Kalidas", correct: false },
            { text: "Tulsidas", correct: false },
            { text: "Valmiki", correct: true }
        ]
    },

      {
        question: "What is the full form of CSS?",
        answers: [
            { text: " casecading style sheet", correct: true },
            { text: "cascoding style sheet", correct: false },
            { text: "cascoding sheet style", correct: false },
            { text: "code sytle sheet", correct: false }
        ]
    },
      {
        question: "this app develop by ..",
        answers: [
            { text: " vinod", correct: false },
            { text: "vipin", correct: true },
            { text: "prabodh", correct: false },
            { text: "shobhit", correct: false }
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.style.backgroundColor = "green";
        score++;
    } else {
        selectedBtn.style.backgroundColor = "red";
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.style.backgroundColor = "green";
        }
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
