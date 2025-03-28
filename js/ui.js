
const uiModule = {
    updateDifficultyDisplay(level) {
        let difficultyBox = document.getElementById("difficultyBox");
        difficultyBox.classList.remove("easy", "medium", "hard");

        const difficultyIcons = { easy: "🍀", medium: "🌟", hard: "💀" };
        difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)} ${difficultyIcons[level]}`;
        difficultyBox.classList.add(level);
    },

    updateUI(gameState) {
        document.getElementById("wordDisplay").textContent = gameState.displayedWord.split("").join(" ");
    },

    showGameArea() {
        document.getElementById("gameArea").classList.remove("d-none");
        document.getElementById("gameArea").classList.add("d-block");
        document.getElementById("difficultyBox").classList.remove("d-none");
        document.getElementById("difficultyBox").classList.add("d-block");
        document.getElementById("difficultySelection").classList.add("d-none");
        document.getElementById("gameMessage").classList.add("d-none");
        document.getElementById("letterInput").focus();
    },

    showGameMessage(message, type) {
        const gameMessage = document.getElementById("gameMessage");
        gameMessage.textContent = message;
        gameMessage.className = `alert alert-${type} mt-3`;
        gameMessage.classList.remove("d-none");
    },

    updateWrongLetters(letter) {
        document.getElementById("wrongLetters").textContent += `${letter} `;
    },

    showRestartButton() {
        document.getElementById("restartBtn").classList.remove("d-none");
    },

    resetUI() {
        document.getElementById("gameArea").classList.remove("d-block");
        document.getElementById("gameArea").classList.add("d-none");
        document.getElementById("difficultyBox").classList.remove("d-block");
        document.getElementById("difficultyBox").classList.add("d-none");
        document.getElementById("difficultySelection").classList.remove("d-none");
        document.getElementById("wrongLetters").textContent = "Wrong Guesses: ";
        document.getElementById("letterInput").value = "";
        document.getElementById("restartBtn").classList.add("d-none");
        document.getElementById("gameMessage").classList.add("d-none");
    }
};

export default uiModule;
