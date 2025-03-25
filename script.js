// Word List
const wordList = [
	"gold",
	"luck",
	"clover",
	"rain",
	"charm",
	"parade",
	"leprechaun",
	"treasure",
	"celebration",
	"greenery",
	"shenanigans",
	"tradition",
];

//decare variables
let selectedWord = "";
let displayedWord = "";
let wrongGuesses = 0;
let guessedLetters = [];
const maxMistakes = 6;

// Start Game Function (runs everything)
function startGame(level) {
	//reset game
	wrongGuesses = 0;
	guessedLetters = [];

	selectedWord = getRandomWord(level);
	displayedWord = "_".repeat(selectedWord.length);

	updateDifficultyDisplay(level);
	updateUI();

	//Show Game Area/Difficulty Display , hide selection buttons
	document.getElementById("gameArea").classList.remove("d-none");
	document.getElementById("gameArea").classList.add("d-block");

	document.getElementById("difficultyBox").classList.remove("d-none");
	document.getElementById("difficultyBox").classList.add("d-block");

	document.getElementById("difficultySelection").classList.add("d-none");

	// auto focus on input
	document.getElementById("letterInput").focus();
}

function getRandomWord(level) {
	let filteredWords = wordList.filter((word) => {
		if (level === "easy") return word.length <= 4;
		if (level === "medium") return word.length >= 5 && word.length <= 7;
		if (level === "hard") return word.length >= 8;
	});
	return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

//update Difficulty Display
function updateDifficultyDisplay(level) {
	let difficultyBox = document.getElementById("difficultyBox");
	difficultyBox.classList.remove("easy", "medium", "hard");

	if (level === "easy") {
		difficultyBox.textContent = "Difficulty: Easy 🍀";
		difficultyBox.classList.add("easy");
	} else if (level === "medium") {
		difficultyBox.textContent = "Difficulty: Medium 🌟";
		difficultyBox.classList.add("medium");
	} else if (level === "hard") {
		difficultyBox.textContent = "Difficulty: Hard 💀";
		difficultyBox.classList.add("hard");
	}
}

//update UI
function updateUI() {
	// Update displayed word with spaces between letters
	document.getElementById("wordDisplay").textContent = displayedWord
		.split("")
		.join(" ");
}

//guess letter
function guessLetter(letter) {
	const letterInput = document.getElementById("letterInput");
	const guessedLetter = letterInput.value.toLowerCase();

	// Check if the input is valid
	if (
		guessedLetter.length !== 1 ||
		!guessedLetter.match(/[a-z]/i) ||
		guessedLetters.includes(guessedLetter)
	) {
		alert("Please enter a valid letter that you haven't guessed before.");
		letterInput.value = "";
		return;
	}

	// Add guessed letter to the list of guessed letters
	guessedLetters.push(guessedLetter);
	letterInput.value = "";

	// Check if the guessed letter is in the selected word
	if (selectedWord.includes(guessedLetter)) {
		updateCorrectGuess(guessedLetter);
	} else {
		updateWrongGuess(guessedLetter);
	}
}

//update wrong guess
function updateWrongGuess(guessedLetter) {
	wrongGuesses++;
	document.getElementById("wrongLetters").textContent += `${guessedLetter} `;

	// Update shamrock image dp 6 and subtract it by wrong guesses
	// document.getElementById("shamrock").src = `img/shamrock${6 - wrongGuesses}.jpg`;

	// if wrong guesses equal to max mistakes call function endGame
	if (wrongGuesses === maxMistakes) {
		endGame(false);
	}
}

//update correct guess
function updateCorrectGuess(guessedLetter) {
	// Update displayed word with the guessed letter
	let newDisplayedWord = "";
	for (let i = 0; i < selectedWord.length; i++) {
		if (selectedWord[i] === guessedLetter) {
			newDisplayedWord += guessedLetter;
		} else {
			newDisplayedWord += displayedWord[i];
		}
	}
	displayedWord = newDisplayedWord;

	// Update UI
	updateUI();

	// Check if the player has won
	if (!displayedWord.includes("_")) {
		endGame(true);
	}
}

//restart game
function restartGame() {
	// Hide Game Area, show Difficulty Selection
	document.getElementById("gameArea").classList.remove("d-block");
	document.getElementById("gameArea").classList.add("d-none");

	document.getElementById("difficultyBox").classList.remove("d-block");
	document.getElementById("difficultyBox").classList.add("d-none");

	document.getElementById("difficultySelection").classList.remove("d-none");

	// Reset shamrock image
	// document.getElementById("shamrock").src = "img/image6.jpg";

	// Clear wrong letters
	document.getElementById("wrongLetters").textContent = "Wrong Guesses: ";

	// Clear input
	document.getElementById("letterInput").value = "";
}

// End Game Function
function endGame(isWin) {
	if (isWin) {
		alert("Congratulations! You've guessed the word: " + selectedWord);
	} else {
		alert("Game Over! The word was: " + selectedWord);
	}

	// Show restart button
	document.getElementById("restartBtn").classList.remove("d-none");
}

// Event Listener for Enter Key
document
	.getElementById("letterInput")
	.addEventListener("keyup", function (event) {
		if (event.key === "Enter") {
			guessLetter();
		}
	});
