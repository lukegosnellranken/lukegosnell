// Get current year
document.getElementById("year").innerHTML =  new Date().getFullYear() + " " + document.getElementById("year").innerHTML;

// https://www.youtube.com/watch?v=d620nV6bp0A

console.log("Page height:", document.documentElement.scrollHeight);

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#D4D0CD';
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY
        }
        // move particle
        this.x += this.directionX / 15;
        // draw particle
        this.y += this.directionY / 15;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberofparticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberofparticles; i++) {
        let size = (Math.random() * 1.5) + 0;
        let x = (Math.random() * ((innerWidth - size * 2) - size * 2));
        let y = (Math.random() * ((innerHeight - size * 2) - size * 2));
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#D4D0CD'

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

// resize event
window.addEventListener('resize',
    function() {
        canvas.width = this.innerWidth;
        canvas.height = this.innerHeight;
        // init();
    }
);

init();
animate();

// Desktop Contact

const contactItem = document.getElementById('contact-nav-item');
const contactModal = document.getElementById('contact-modal');

contactItem.addEventListener('mouseenter', () => {
    contactModal.classList.add('visible');
});

contactItem.addEventListener('mouseleave', () => {
    contactModal.classList.remove('visible');
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const confirm = document.getElementById('copy-confirm');
        const mobileConfirm = document.getElementById('mobile-copy-confirm');
        
        if (window.innerWidth <= 990) {
            mobileConfirm.classList.add('show');
            setTimeout(() => mobileConfirm.classList.remove('show'), 1500);
        } else {
            confirm.classList.add('show');
            setTimeout(() => confirm.classList.remove('show'), 1500);
        }
    });
}

// Mobile Contact

const mobileOverlay = document.getElementById('mobile-contact-overlay');
const contactLink = document.getElementById('contact-nav-link');

contactLink.addEventListener('click', (e) => {
    if (window.innerWidth <= 990) {
        e.preventDefault();
        mobileOverlay.style.display = 'block';
        setTimeout(() => mobileOverlay.classList.add('visible'), 10);
    }
});

mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) {
        mobileOverlay.classList.remove('visible');
        setTimeout(() => mobileOverlay.style.display = 'none', 200);
    }
});