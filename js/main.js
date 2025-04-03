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
    const soundEnabled = document.getElementById('soundEnabled');
    const soundVolume = document.getElementById('soundVolume');

    rainEnabled.checked = gameConfig.rain.enabled;
    rainDensity.value = gameConfig.rain.density;
    soundEnabled.checked = gameConfig.sound.enabled;
    soundVolume.value = gameConfig.sound.volume * 100;

    rainEnabled.addEventListener('change', () => {
        updateConfig({ rain: { ...gameConfig.rain, enabled: rainEnabled.checked } });
    });

    rainDensity.addEventListener('input', () => {
        updateConfig({ rain: { ...gameConfig.rain, density: parseInt(rainDensity.value) } });
    });

    soundEnabled.addEventListener('change', () => {
        updateConfig({ sound: { ...gameConfig.sound, enabled: soundEnabled.checked } });
    });

    soundVolume.addEventListener('input', () => {
        updateConfig({ sound: { ...gameConfig.sound, volume: parseInt(soundVolume.value) / 100 } });
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

    globalThis.startGame = async (level) => await gameModule.startGame(level);
    window.restartGame = () => {
        gameModule.resetState();
        uiModule.resetUI();
    };
}