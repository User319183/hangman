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
        const difficultySelection = document.getElementById("difficultySelection");
        const gameArea = document.getElementById("gameArea");
        const difficultyBox = document.getElementById("difficultyBox");
        const gameMessage = document.getElementById("gameMessage");

        difficultySelection.classList.add("fade-exit");
        setTimeout(() => {
            difficultySelection.classList.add("d-none");
            
            gameArea.classList.remove("d-none");
            difficultyBox.classList.remove("d-none");
            gameMessage.classList.add("d-none");
            
            requestAnimationFrame(() => {
                gameArea.classList.add("d-block", "fade-enter");
                difficultyBox.classList.add("d-block", "fade-enter");
                
                requestAnimationFrame(() => {
                    gameArea.classList.add("fade-enter-active");
                    difficultyBox.classList.add("fade-enter-active");
                    document.getElementById("letterInput").focus();
                });
            });
        }, 300);
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

    updateWordGraveyard(graveyard) {
        const graveyardElement = document.getElementById("wordGraveyard");
        const wordList = document.getElementById("wordList");
        
        graveyardElement.classList.remove("d-none");
        wordList.innerHTML = graveyard.map(entry => 
            `<span style="color: ${entry.won ? '#4CAF50' : '#e74c3c'}">${entry.word}</span>`
        ).join('');
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