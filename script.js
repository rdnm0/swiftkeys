document.addEventListener('DOMContentLoaded', function () {
    const textInput = document.getElementById('textInput');
    const timerDisplay = document.getElementById('timer');
    const wordCountDisplay = document.getElementById('wordCount');
    const wpmDisplay = document.getElementById('wpm');
    const feedbackDisplay = document.getElementById('feedback');
    const wordSetDisplay = document.getElementById('wordSet');
    const startButton = document.getElementById('startButton');

    let timerInterval;
    let startTime, endTime, wordCount, totalTime;

    const wordSet = [
        "apple", "banana", "cherry", "orange", "grape",
        "elephant", "giraffe", "zebra", "lion", "tiger"
    ];

    function generateWordSet() {
        wordSetDisplay.textContent = `Type the following words: ${wordSet.join(' ')}`;
    }

    function startGame() {
        feedbackDisplay.textContent = "";
        wordCount = 0;
        totalTime = 0;
        generateWordSet();
        startTimer();
    }

    function startTimer() {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        const currentTime = new Date().getTime();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000); // in seconds
        timerDisplay.textContent = `Time: ${elapsedTime}s`;
        totalTime = elapsedTime;
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function endGame() {
        stopTimer();
        calculateWPM();
        feedbackDisplay.textContent = `Game Over! Your Average Words Per Minute: ${wpmDisplay.textContent}`;
    }

    function calculateWPM() {
        const wordsPerMinute = Math.round((wordCount / totalTime) * 60);
        wpmDisplay.textContent = `WPM: ${wordsPerMinute}`;
    }

    textInput.addEventListener('input', function () {
        const typedText = textInput.value.trim();
        const targetText = wordSet.join(' ');

        if (typedText === targetText) {
            wordCount = wordSet.length;
            wordCountDisplay.textContent = `Word Count: ${wordCount}`;
            endGame();
        } else {
            const typedWords = typedText.split(/\s+/);
            wordCount = typedWords.filter(word => word !== '').length;
            wordCountDisplay.textContent = `Word Count: ${wordCount}`;
        }
    });

    startButton.addEventListener('click', function () {
        textInput.value = "";
        startGame();
        textInput.focus();
    });
});
