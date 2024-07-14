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