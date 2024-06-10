document.addEventListener('DOMContentLoaded', () => {
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
    

    const form = document.getElementById('start-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('name').value;
            localStorage.setItem('username', username); // Stores username in localstorage
            window.location.href = 'quiz.html';
        });
    }

    const username = localStorage.getItem('username'); // Get username from local storage

    /**Function to shuffle questions */
    function shuffleQuestions(array) {
        for (let s = array.length - 1; s > 0; s--) {
            const j = Math.floor(Math.random() * (s + 1));
            [array[s], array[j]] = [array[j], array[s]];
        }
    }

    function startQuiz() {
        currentQuestionIndex = 0; // Reset question index
        score = 0;
        quizEnded = false;
        shuffleQuestions(questions); // Shuffle questions at the start of the quiz
        nextButton.classList.add('next'); // Hide the next button
        resultArea.classList.add('next'); // Hide the result area
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
            score++; // Increment score if the answer is correct
        }

        // Highlight correct and wrong answers
        Array.from(answerButtonsElement.children).forEach(button => {
            const answer = button.dataset.answer;
            const isCorrect = answer === correctAnswer;
            if (!correct && isCorrect) {
                button.classList.add('correct');
            }
            if (button === selectedButton) {
                setStatusClass(button, correct);
            }
            // Disable other answer options after an answer is selected
            button.disabled = true;
        });

        // Show the next button or result area based on the progress
        if (currentQuestionIndex < questions.length - 1) {
            nextButton.classList.remove('next');
        } else {
            quizEnded = true;
            showResult();
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    function showResult() {
        questionElement.innerHTML = '';
        answerButtonsElement.innerHTML = `${username}, You scored ${score} out of ${questions.length}!`; // Display the username and result;
        nextButton.classList.add('next');
        resultArea.classList.remove('next');
        restartButton.classList.remove('next');
        resultElement.innerText = '';
    }

    nextButton.addEventListener('click', () => {
        if (quizEnded) {
            startQuiz();
        } else {
            currentQuestionIndex++;
            showQuestion();
        }
    });

    restartButton.addEventListener('click', startQuiz); // Restart the quiz when the restart button is clicked

    startQuiz();

});