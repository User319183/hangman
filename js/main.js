
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
    const soundEnabled = document.getElementById('soundEnabled');
    const volumeRange = document.getElementById('volumeRange');
    const rainEnabled = document.getElementById('rainEnabled');
    const rainDensity = document.getElementById('rainDensity');

    soundEnabled.checked = gameConfig.sound.enabled;
    volumeRange.value = gameConfig.sound.volume;
    rainEnabled.checked = gameConfig.rain.enabled;
    rainDensity.value = gameConfig.rain.density;

    soundEnabled.addEventListener('change', () => {
        updateConfig({ sound: { ...gameConfig.sound, enabled: soundEnabled.checked } });
    });

    volumeRange.addEventListener('input', () => {
        updateConfig({ sound: { ...gameConfig.sound, volume: parseFloat(volumeRange.value) } });
    });

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
    window.restartGame = () => uiModule.resetUI();
}
