
import uiModule from './ui.js';

const gameModule = {
    wordList: [],
    
    async fetchWords() {
        try {
            const response = await fetch('https://random-word-api.herokuapp.com/word?number=50');
            const words = await response.json();
            this.wordList = words;
        } catch (error) {
            console.error('Error fetching words:', error);
            // Fallback word list if API fails
            this.wordList = [
                "gold", "luck", "clover", "rain", "charm", "parade",
                "leprechaun", "treasure", "celebration", "greenery",
                "shenanigans", "tradition"
            ];
        }
    },
    state: {
        selectedWord: "",
        displayedWord: "",
        wrongGuesses: 0,
        guessedLetters: [],
        maxMistakes: 6
    },

    getRandomWord(level) {
        if (this.wordList.length === 0) {
            this.wordList = [
                "gold", "luck", "clover", "rain", "charm", "parade",
                "leprechaun", "treasure", "celebration", "greenery",
                "shenanigans", "tradition"
            ];
        }
        
        let filteredWords = this.wordList.filter(word => {
            if (level === "easy") return word.length <= 4;
            if (level === "medium") return word.length >= 5 && word.length <= 7;
            if (level === "hard") return word.length >= 8;
        });

        if (filteredWords.length === 0) {
            filteredWords = this.wordList;
        }

        return filteredWords[Math.floor(Math.random() * filteredWords.length)];
    },

    async startGame(level) {
        if (this.wordList.length === 0) {
            await this.fetchWords();
        }
        this.state.wrongGuesses = 0;
        this.state.guessedLetters = [];
        this.state.selectedWord = this.getRandomWord(level);
        this.state.displayedWord = "_".repeat(this.state.selectedWord.length);

        uiModule.updateDifficultyDisplay(level);
        uiModule.updateUI(this.state);
        uiModule.showGameArea();
        document.getElementById("shamrock").src = generateHealthImage(6);
    },

    guessLetter(letter) {
        const guessedLetter = letter.toLowerCase();

        if (guessedLetter.length !== 1 || !guessedLetter.match(/[a-z]/i) || 
            this.state.guessedLetters.includes(guessedLetter)) {
            uiModule.showGameMessage("Please enter a valid letter that you haven't guessed before.", "warning");
            return;
        }

        this.state.guessedLetters.push(guessedLetter);

        if (this.state.selectedWord.includes(guessedLetter)) {
            this.updateCorrectGuess(guessedLetter);
        } else {
            this.updateWrongGuess(guessedLetter);
        }
    },

    updateWrongGuess(guessedLetter) {
        this.state.wrongGuesses++;
        uiModule.updateWrongLetters(guessedLetter);
        document.getElementById("shamrock").src = generateHealthImage(6 - this.state.wrongGuesses);

        if (this.state.wrongGuesses === this.state.maxMistakes) {
            this.endGame(false);
        }
    },

    updateCorrectGuess(guessedLetter) {
        let newDisplayedWord = "";
        for (let i = 0; i < this.state.selectedWord.length; i++) {
            newDisplayedWord += this.state.selectedWord[i] === guessedLetter ? 
                guessedLetter : this.state.displayedWord[i];
        }
        this.state.displayedWord = newDisplayedWord;
        uiModule.updateUI(this.state);

        if (!this.state.displayedWord.includes("_")) {
            this.endGame(true);
        }
    },

    endGame(isWin) {
        const message = isWin
            ? `Congratulations! You've found the word: ${this.state.selectedWord}`
            : `Game Over! The word was: ${this.state.selectedWord}`;
        uiModule.showGameMessage(message, isWin ? "success" : "danger");
        uiModule.showRestartButton();
    }
};

export default gameModule;
