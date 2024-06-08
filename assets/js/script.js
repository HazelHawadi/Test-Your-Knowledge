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
        button.innerText = answer;
        button.classList.add('btn');
        button.dataset.answer = answer;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });

    //progress Bar
    progressElement.style.width = ((questionIndex + 1) / questions.length) * 100 + '%';
}

function resetState() {
    nextButton.classList.add('next');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

/**Function to handle the answer selection */
function selectAnswer(h) {

    if (quizCompleted) return;
    const selectedButton = h.target;

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
        setCorrectWrong(button, correct); //to highlight the selected answer
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
function setCorrectWrong(element, correct) {
    clearCorrectWrong(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearCorrectWrong(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

/**Function to display the result */
function showResult() {
    nextButton.classList.add('next'); //will hide the next button
    resultArea.classList.remove('next'); //will show the result area
    restartButton.classList.remove('next'); // Show the restart button
    resultElement.innerText = `You scored ${score} out of ${questions.length}!`; // Display the result
}

/**Event listener for the next button */
nextButton.addEventListener('click', () => {
    if (quizEnded) {
        startQuiz(); //restart the quiz if it is completed
    } else {
        questionIndex++; // Move to the next question
        showQuestion(); // Show the next question
    }
});

// Event listener for the restart button
restartButton.addEventListener('click', startQuiz); // Restart the quiz when the restart button is clicked

startQuiz();