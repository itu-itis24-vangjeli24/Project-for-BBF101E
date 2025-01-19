const word = "NYMPH"; // Assigned word
let revealedWord = "_".repeat(word.length);
let score = 0;
let lives = 3;

const wordDisplay = document.getElementById("word-display");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const input = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-button");
const resetButton = document.getElementById("reset-button");
const cards = document.querySelectorAll(".card");

function updateDisplay() {
    wordDisplay.textContent = revealedWord;
    scoreDisplay.textContent = score;
    livesDisplay.textContent = "❤".repeat(lives);
}

function revealCard(letter) {
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            cards[i].src = `images/${letter}.svg`;
        }
    }
}

function handleGuess() {
    const guess = input.value.toUpperCase();
    if (!guess) return;

    if (word.includes(guess)) {
        score += 20;
        revealedWord = revealedWord.split("").map((c, i) => (word[i] === guess ? guess : c)).join("");
        revealCard(guess);
    } else {
        lives--;
    }

    if (revealedWord === word) {
        alert("🎉 You won! The word was " + word);
        disableGame();
    } else if (lives === 0) {
        alert("❌ You lost! The word was " + word);
        disableGame();
    }

    updateDisplay();
    input.value = "";
}

function resetGame() {
    revealedWord = "_".repeat(word.length);
    score = 0;
    lives = 3;
    // Reset all cards to the "card back" image
    cards.forEach((card) => (card.src = "images/card-back1.svg"));
    updateDisplay();
    input.disabled = false;
    submitButton.disabled = false;
}

function disableGame() {
    input.disabled = true;
    submitButton.disabled = true;
}

submitButton.addEventListener("click", handleGuess);
resetButton.addEventListener("click", resetGame);

// Initialize the game
resetGame();
