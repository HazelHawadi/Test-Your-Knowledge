//variables to keep track of the current state of the quiz
let questionIndex = 0;
let score = 0;
let quizEnded = false;

// DOM elements
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons'); 
const nextButton = document.getElementById('next-btn'); 
const resultArea = document.getElementById('result-area');
const resultElement = document.getElementById('result'); 
const restartButton = document.getElementById('restart-btn');
const progressElement = document.getElementById('progress');

/**Function to start the quiz */
function startQuiz() {
    questionIndex = 0; // to reset the question index
    score = 0;
    quizEnded = false; 
    nextButton.classList.add('next');
    resultArea.classList.add('next'); 
    showQuestion(); //to show the first question
}

/**Function to display the current question and answer choices */
function showQuestion() {
    resetState();
    const currentQuestion = questions[questionIndex];
    questionElement.innerText = currentQuestion.question; //to display the current question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });

    //progress Bar
    progressElement.style.width = ((questionIndex + 1) / questions.length) * 100 + '%';
}

/**Function to handle the answer selection */
function chooseAnswer(h) {
    if (quizEnded) return;
    const selectedButton = h.target; //to get the selected button
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++; //to increase the score if the answer is correct
}
/**to highlight answer buttons if the answer is correct or wrong*/
Array.from(answerButtonsElement.children).forEach(button => {
    const isCorrect = button.dataset.correct === 'true';
    if (!correct && isCorrect) {
        button.classList.add('correct'); //to highlight the correct answer
    }
    if (button === selectedButton) {
        correctWrong(button, correct); //to highlight the selected answer
    }
});

// Show the next button or result area based on the progress
if (questionIndex < questions.length - 1) {
    nextButton.classList.remove('next');
} else {
    quizEnded = true;
    showResult(); // Show the result area
}
}
/**Function to set if the answer selected is correct or wrong */ 
function correctWrong() {
    
}

/**Function to display the result */
function showResult() {
    
}

/**Event listener for the next button */
nextButton.addEventListener(

);

