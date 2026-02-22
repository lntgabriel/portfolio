document.addEventListener('DOMContentLoaded', () => {
    
    // --- MENU MOBILE ---
    const navMenu = document.getElementById('nav-menu'),
          navToggle = document.getElementById('nav-toggle'),
          navClose = document.getElementById('nav-close');

    if(navToggle) { navToggle.addEventListener('click', () => { navMenu.classList.add('show-menu') })}
    if(navClose) { navClose.addEventListener('click', () => { navMenu.classList.remove('show-menu') })}

    const navLink = document.querySelectorAll('.nav__link')
    function linkAction(){ navMenu.classList.remove('show-menu') }
    navLink.forEach(n => n.addEventListener('click', linkAction))

    // --- TYPEWRITER (Efeito digitação) ---
    const typeSpan = document.querySelector('.typing-effect');
    if(typeSpan) {
        const words = ["QUE RESOLVEM.", "QUE FUNCIONAM.", "INTUITIVAS."];
        let i = 0;
        let j = 0;
        let isDeleting = false;
        
        function loop() {
            typeSpan.innerHTML = words[i].substring(0, j);
            if(isDeleting) j--; else j++;

            if(!isDeleting && j === words[i].length + 1) {
                isDeleting = true; setTimeout(loop, 2000); 
            } else if (isDeleting && j === 0) {
                isDeleting = false; i = (i + 1) % words.length; setTimeout(loop, 200);
            } else {
                setTimeout(loop, isDeleting ? 50 : 150);
            }
        }
        loop();
    }

    // --- CANVAS PARTICLES (Otimizado) ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];

        function init() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            particles = [];
            const count = window.innerWidth < 768 ? 20 : 50; 
            for(let i=0; i<count; i++) particles.push(new Particle());
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2;
                this.opacity = Math.random() * 0.5;
            }
            update() {
                this.x += this.vx; 
                this.y += this.vy;
                if(this.x < 0) this.x = width;
                if(this.x > width) this.x = 0;
                if(this.y < 0) this.y = height;
                if(this.y > height) this.y = 0;
            }
            draw() {
                ctx.fillStyle = `rgba(140, 82, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
                ctx.fill();
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', init);
        init();
        animate();
    }
});