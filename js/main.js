import gameModule from './game.js';
import uiModule from './ui.js';

// Load configuration
loadConfig();

// Event listeners for settings
document.addEventListener('DOMContentLoaded', () => {
    initializeSettingsListeners();
    initializeGameListeners();
});

function initializeSettingsListeners() {
    const rainEnabled = document.getElementById('rainEnabled');
    const rainDensity = document.getElementById('rainDensity');

    rainEnabled.checked = gameConfig.rain.enabled;
    rainDensity.value = gameConfig.rain.density;

    rainEnabled.addEventListener('change', () => {
        updateConfig({ rain: { ...gameConfig.rain, enabled: rainEnabled.checked } });
    });

    rainDensity.addEventListener('input', () => {
        updateConfig({ rain: { ...gameConfig.rain, density: parseInt(rainDensity.value) } });
    });
}

function initializeGameListeners() {
    document.getElementById("letterInput").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            const letter = this.value;
            this.value = '';
            gameModule.guessLetter(letter);
        }
    });

    window.startGame = async (level) => await gameModule.startGame(level);
    window.restartGame = () => {
        gameModule.resetState();
        uiModule.resetUI();
    };
}