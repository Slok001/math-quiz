// Add these lines to the top of your script.js
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

// Modify checkAnswer function to play sounds
function checkAnswer(answer) {
    if (answer === correctAnswer) {
        correctSound.play();
        score++;
        scoreElement.textContent = `Score: ${score}`;
        generateQuestion();
    } else {
        wrongSound.play();
        showPopup();
    }
}

// script.js
document.addEventListener("DOMContentLoaded", function() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const scoreElement = document.getElementById("score");
    const timerElement = document.getElementById("timer");
    const restartBtn = document.getElementById("restart-btn");
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("close-popup");

    let score = 0;
    let correctAnswer;
    let timer;
    let startTime;

    function startGame() {
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        generateQuestion();
        resetTimer();
    }

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 100) + 1;
        const num2 = Math.floor(Math.random() * 100) + 1;
        const operators = ['+', '-', '*'];
        const operator = operators[Math.floor(Math.random() * operators.length)];
        correctAnswer = eval(`${num1} ${operator} ${num2}`);

        questionElement.textContent = `${num1} ${operator} ${num2} = ?`;

        const answers = generateAnswers(correctAnswer);
        optionsElement.innerHTML = "";
        answers.forEach(answer => {
            const option = document.createElement("div");
            option.classList.add("option");
            option.textContent = answer;
            option.addEventListener("click", () => checkAnswer(answer));
            optionsElement.appendChild(option);
        });
    }

    function generateAnswers(correctAnswer) {
        const answers = new Set();
        answers.add(correctAnswer);
        while (answers.size < 4) {
            const randomAnswer = Math.floor(Math.random() * 200) - 50;
            answers.add(randomAnswer);
        }
        return Array.from(answers).sort(() => Math.random() - 0.5);
    }

    function checkAnswer(answer) {
        if (answer === correctAnswer) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
            generateQuestion();
        } else {
            showPopup();
        }
    }

    function showPopup() {
        clearInterval(timer);
        popup.style.display = "flex";
    }

    function resetTimer() {
        clearInterval(timer);
        timerElement.textContent = "00:00.000";
        startTime = Date.now();
        timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const minutes = String(Math.floor(elapsed / 60000)).padStart(2, '0');
            const seconds = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, '0');
            const milliseconds = String(elapsed % 1000).padStart(3, '0');
            timerElement.textContent = `${minutes}:${seconds}.${milliseconds}`;
        }, 10);
    }

    restartBtn.addEventListener("click", startGame);
    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
        startGame();
    });

    startGame();
});
