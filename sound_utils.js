function generateSound(type) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const baseVolume = 0.1 * gameConfig.sound.volume;
    const endVolume = 0.01 * gameConfig.sound.volume;

    if (type === 'correct') {
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(baseVolume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(endVolume, audioContext.currentTime + 0.3);
    } else {
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(baseVolume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(endVolume, audioContext.currentTime + 0.3);
    }

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
}