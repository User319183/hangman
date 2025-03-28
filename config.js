
const defaultConfig = {
    sound: {
        enabled: true,
        volume: 0.5,
        correctSound: true,
        wrongSound: true
    },
    rain: {
        enabled: true,
        density: 150,
        speed: 1,
        opacity: 0.2
    },
    theme: {
        darkMode: true,
        rainColor: '#aec2e0'
    }
};

let gameConfig = { ...defaultConfig };

function saveConfig() {
    localStorage.setItem('gameConfig', JSON.stringify(gameConfig));
}

function loadConfig() {
    const saved = localStorage.getItem('gameConfig');
    if (saved) {
        gameConfig = { ...defaultConfig, ...JSON.parse(saved) };
    }
}

function updateConfig(newConfig) {
    gameConfig = { ...gameConfig, ...newConfig };
    saveConfig();
    applyConfig();
}

function applyConfig() {
    // If rain effect is enabled, apply rain effect
    if (window.rainEffect) {
        window.rainEffect.setOptions(gameConfig.rain);
    }

    // If sound system is enabled, apply sound settings
    if (window.soundSystem) {
        window.soundSystem.setVolume(gameConfig.sound.volume);
        window.soundSystem.setEnabled(gameConfig.sound.enabled);
    }

    // Apply theme
    document.body.classList.toggle('dark-mode', gameConfig.theme.darkMode);
    document.documentElement.style.setProperty('--rain-color', gameConfig.theme.rainColor);
}
