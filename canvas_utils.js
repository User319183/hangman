function generateHealthImage(health) {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#e8f5e9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw shamrock with gradients
    for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.translate(100, 100);
        ctx.rotate((i * 120) * Math.PI / 180);

        // Create gradient for leaf
        const gradient = ctx.createRadialGradient(20, 0, 0, 20, 0, 25);
        gradient.addColorStop(0, '#4CAF50');
        gradient.addColorStop(1, '#2E7D32');

        // Draw leaf with gradient
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(20, 0, 25, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add detail to leaf
        ctx.beginPath();
        ctx.moveTo(20, -15);
        ctx.quadraticCurveTo(30, 0, 20, 15);
        ctx.strokeStyle = '#1B5E20';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    }

    // Draw stem with gradient
    const stemGradient = ctx.createLinearGradient(95, 120, 105, 120);
    stemGradient.addColorStop(0, '#2E7D32');
    stemGradient.addColorStop(1, '#4CAF50');
    ctx.fillStyle = stemGradient;
    ctx.fillRect(95, 120, 10, 50);

    // Show damage with gradient overlay
    if (health < 6) {
        const damageGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        damageGradient.addColorStop(0, 'rgba(183, 28, 28, 0.7)');
        damageGradient.addColorStop(1, 'rgba(183, 28, 28, 0.3)');

        ctx.fillStyle = damageGradient;
        ctx.fillRect(0, 0, canvas.width * (1 - health / 6), canvas.height);
    }

    return canvas.toDataURL();
}