let currentQuestionIndex = 0;
let score = 0;
let quizEnded = false;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultArea = document.getElementById('result-area');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');
const progressElement = document.getElementById('progress');

/**Function to start the quiz*/
function startQuiz() {
    currentQuestionIndex = 0; //to reset question index
    score = 0;
    quizCompleted = false;
    nextButton.classList.add('next'); //to hide the next button 
    resultArea.classList.add('next'); //to hide the result area 
    showQuestion();
}

/**Function to display the current question and answer choices*/
function showQuestion() {
    resetState(); // Reset the state before showing the new question
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    // Create buttons for each answer choice and add event listener for selecting an answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.dataset.answer = answer; // Use dataset.answer instead of dataset.correct
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });

    //progress bar
    progressElement.style.width = ((currentQuestionIndex + 1) / questions.length) * 100 + '%';
}

/**Function to reset the state*/
function resetState() {
    nextButton.classList.add('next'); // Hide the next button
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

/**Function to handle answer selection*/
function selectAnswer(h) {
    if (quizEnded) return;

    const selectedButton = h.target; // Get the selected button
    const selectedAnswer = selectedButton.dataset.answer; // Get the selected answer
    const correctAnswer = questions[currentQuestionIndex].correctAnswer; // Get the correct answer

    // Check if the selected answer is correct
    const correct = selectedAnswer === correctAnswer;
    if (correct) {
        score++; // Increase the score if the answer is correct
    }

    // Highlight correct and wrong answers
    Array.from(answerButtonsElement.children).forEach(button => {
        const answer = button.dataset.answer;
        const isCorrect = answer === correctAnswer;
        if (!correct && isCorrect) {
            button.classList.add('correct'); // Highlight the correct answer
        }
        if (button === selectedButton) {
            setStatusClass(button, correct); // Highlight the selected answer
        }
        // Disable other answer options after an answer is selected
        button.disabled = true;
    });

    /**Show the next button or result area based on the progress*/
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.classList.remove('next');
    } else {
        quizEnded = true;
        showResult();
    }
}

/**Function to set the status class (correct or wrong) on the selected answer*/
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

/**Function to clear any existing status class on the element*/
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

/**Function to display the result*/
function showResult() {
    nextButton.classList.add('next');
    resultArea.classList.remove('next');
    restartButton.classList.remove('next');
    resultElement.innerText = `You scored ${score} out of ${questions.length}!`; // Display the result
}

/**Event listener for the next button*/
nextButton.addEventListener('click', () => {
    if (quizEnded) {
        startQuiz();
    } else {
        currentQuestionIndex++;
        showQuestion();
    }
});

/**Event listener for the restart button*/
restartButton.addEventListener('click', startQuiz); // Restart the quiz when the restart button is clicked

startQuiz();
