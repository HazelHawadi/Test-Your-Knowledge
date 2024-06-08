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
    quizCompleted = false; 
    nextButton.classList.add('next');
    resultArea.classList.add('next'); 
    showQuestion(); //to show the first question
}

/**Function to display the current question and answer choices */
function showQuestion() {
    resetState();
    const currentQuestion = questions[questionIndex];
    questionElement.innerText = currentQuestion.question; //to display the current question

}

/**Function to handle the answer selection */
function selectAnswer() {
    
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

