function startExperience() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const music = document.getElementById('bg-music');
    const timerSection = document.getElementById('timer-section');

    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        timerSection.style.display = 'flex';
        music.play().catch(e => console.log("Audio play failed:", e));
        startTimer();
    }, 800);
}

// Love Timer Logic
function startTimer() {
    const startDate = new Date('2024-10-23T00:00:00');

    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// ============================================
// 📸 Photo Modal Logic
// ============================================

function openPhotoModal(imgSrc, title, msg) {
    const modal = document.getElementById('photo-modal');
    document.getElementById('modal-photo').src = imgSrc;
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-msg').textContent = msg;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePhotoModal() {
    document.getElementById('photo-modal').style.display = 'none';
    document.body.style.overflow = '';
}

// Close modal on outside click
document.getElementById('photo-modal').addEventListener('click', function (e) {
    if (e.target === this) {
        closePhotoModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closePhotoModal();
        closeRoseModal();
    }
});

// Attach click events to masonry items
document.querySelectorAll('.masonry-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.getAttribute('data-title');
        const msg = item.getAttribute('data-msg');
        openPhotoModal(img.src, title, msg);
    });
});

// Rose / Pichkari Modal Logic
function openRoseModal() {
    document.getElementById('rose-modal').style.display = 'flex';
}

function closeRoseModal() {
    document.getElementById('rose-modal').style.display = 'none';
}

// ============================================
// 👁️ Intersection Observer for Masonry Reveal
// ============================================

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.masonry-item').forEach(el => {
    observer.observe(el);
});

// ============================================
// 🎨 Holi Color Splash Particle System
// ============================================

const canvas = document.getElementById('hearts');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colorSplashes = [];

// Holi color palette
const holiColors = [
    { r: 255, g: 20, b: 147 },   // Deep Pink (Gulaal)
    { r: 255, g: 215, b: 0 },    // Gold (Haldi)
    { r: 0, g: 191, b: 255 },    // Deep Sky Blue
    { r: 124, g: 252, b: 0 },    // Lawn Green
    { r: 255, g: 99, b: 71 },    // Tomato Orange
    { r: 155, g: 89, b: 182 },   // Amethyst Purple
    { r: 255, g: 0, b: 255 },    // Magenta
    { r: 0, g: 206, b: 209 },    // Dark Turquoise
    { r: 255, g: 140, b: 0 },    // Dark Orange
    { r: 50, g: 205, b: 50 },    // Lime Green
];

class ColorSplash {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 200;
        this.size = Math.random() * 30 + 10;
        this.speedY = Math.random() * 2.0 + 0.5;
        this.speedX = Math.random() * 3 - 1.5;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.06;
        this.color = holiColors[Math.floor(Math.random() * holiColors.length)];
        this.shapeType = Math.floor(Math.random() * 3);
        this.wobble = Math.random() * 0.04;
        this.wobbleOffset = Math.random() * Math.PI * 2;
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.wobbleOffset) * this.wobble * 15;
        this.rotation += this.rotationSpeed;
        this.wobbleOffset += 0.03;
        if (this.y < -50) this.reset();
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        const { r, g, b } = this.color;

        if (this.shapeType === 0) {
            // Soft glowing circle (color powder / gulaal)
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
            gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.6)`);
            gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.shapeType === 1) {
            // Paint splat shape
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
            ctx.beginPath();
            const points = 6 + Math.floor(Math.random() * 3);
            for (let i = 0; i < points; i++) {
                const angle = (i / points) * Math.PI * 2;
                const rad = this.size * (0.7 + Math.random() * 0.5);
                const px = Math.cos(angle) * rad;
                const py = Math.sin(angle) * rad;
                if (i === 0) {
                    ctx.moveTo(px, py);
                } else {
                    const cpx = Math.cos(angle - 0.3) * rad * 1.2;
                    const cpy = Math.sin(angle - 0.3) * rad * 1.2;
                    ctx.quadraticCurveTo(cpx, cpy, px, py);
                }
            }
            ctx.closePath();
            ctx.fill();

            const innerGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 0.5);
            innerGrad.addColorStop(0, `rgba(255, 255, 255, 0.3)`);
            innerGrad.addColorStop(1, `rgba(255, 255, 255, 0)`);
            ctx.fillStyle = innerGrad;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Color drop shape
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.bezierCurveTo(
                this.size * 0.8, -this.size * 0.3,
                this.size * 0.6, this.size * 0.5,
                0, this.size
            );
            ctx.bezierCurveTo(
                -this.size * 0.6, this.size * 0.5,
                -this.size * 0.8, -this.size * 0.3,
                0, -this.size
            );
            ctx.fill();

            ctx.fillStyle = `rgba(255, 255, 255, 0.25)`;
            ctx.beginPath();
            ctx.arc(-this.size * 0.2, -this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

function initColorSplashes() {
    for (let i = 0; i < 120; i++) {
        colorSplashes.push(new ColorSplash());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    colorSplashes.forEach(splash => {
        splash.update();
        splash.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

initColorSplashes();
animate();
