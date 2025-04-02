// why did i overcomplicate my life

class RainDrop {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * -100;
        this.length = Math.random() * 20 + 10;
        this.speed = Math.random() * 8 + 5;
        this.thickness = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.25 + 0.15;
    }

    update() {
        this.y += this.speed;
        this.x += this.speed * 0.1;

        if (this.y > this.canvas.height || this.x > this.canvas.width) {
            this.reset();
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 1, this.y + this.length);
        ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();
    }
}

function initRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'rainCanvas';
    document.body.insertBefore(canvas, document.body.firstChild);

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const ctx = canvas.getContext('2d');
    let raindrops = Array(gameConfig.rain.density).fill().map(() => new RainDrop(canvas));

    window.rainEffect = {
        setOptions(options) {
            if (options.density !== undefined) {
                raindrops = Array(options.density).fill().map(() => new RainDrop(canvas));
            }
            if (options.enabled !== undefined) {
                canvas.style.display = options.enabled ? 'block' : 'none';
            }
        }
    };

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        raindrops.forEach(drop => {
            drop.update();
            drop.draw(ctx);
        });
        requestAnimationFrame(animate);
    }

    animate();
}