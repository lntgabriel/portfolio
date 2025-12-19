/* ==================== 1. MENU MOBILE E NAVEGAÇÃO ==================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Mostrar Menu */
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* Esconder Menu */
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* Remover Menu ao clicar em link (Mobile) */
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
    navMenu.classList.remove('show-menu');
};
navLink.forEach(n => n.addEventListener('click', linkAction));


/* ==================== 2. MUDANÇA DE BACKGROUND NO HEADER ==================== */
const scrollHeader = () => {
    const header = document.getElementById('header');
    // Quando o scroll for maior que 50 viewport height, adiciona classe de sombra/cor
    // No nosso CSS, o header já tem backdrop-filter, mas podemos adicionar borda extra aqui se quiser
    if(window.scrollY >= 50) {
        document.querySelector('.header').classList.add('header-scrolled');
    } else {
        document.querySelector('.header').classList.remove('header-scrolled');
    }
};
window.addEventListener('scroll', scrollHeader);


/* ==================== 3. SCROLL REVEAL (Animação ao rolar) ==================== */
// Vamos usar Intersection Observer para ser performático
const observerOptions = {
    root: null,
    threshold: 0.1, // Dispara quando 10% do elemento estiver visível
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); 
            // Opcional: deixar de observar para animar só uma vez
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Adicionando a classe de preparação e observando elementos
const revealElements = document.querySelectorAll('.home__content, .home__visual, .section__title, .about__description, .about__info, .projects__card, .skills__box, .contact__info, .contact__form');

revealElements.forEach((el) => {
    el.classList.add('hidden-element'); // Classe CSS que vamos injetar style via JS ou CSS extra
    observer.observe(el);
});

// *Truque*: Injetando o CSS necessário para a animação direto via JS pra não sujar seu CSS principal se não quiser
const styleReveal = document.createElement('style');
styleReveal.innerHTML = `
    .hidden-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
    }
    .visible {
        opacity: 1;
        transform: translateY(0);
    }
    /* Atraso em cascata para cartões de projeto */
    .projects__card:nth-child(2) { transition-delay: 0.2s; }
    .projects__card:nth-child(3) { transition-delay: 0.4s; }
`;
document.head.appendChild(styleReveal);


/* ==================== 4. CURSOR PERSONALIZADO (A Mágica) ==================== */
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

// Checagem se é dispositivo desktop (opcional, já fizemos no CSS media query, mas bom reforçar)
if(window.matchMedia("(min-width: 992px)").matches) {
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // O ponto segue instantaneamente
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // O outline anima via keyframes do Web Web API para suavidade máxima
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" }); // 500ms de "delay" visual
    });
    
    // Efeito Hover em Links e Botões
    const interactiveElements = document.querySelectorAll('a, button, .projects__card, input');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

/* ==================== 5. EFEITO DE DIGITAÇÃO NO HERO ==================== */
const typingElement = document.querySelector('.typing-effect');
const words = ["QUE FUNCIONAM.", "QUE OTIMIZAM.", "PARA MUDAR."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const visibleText = isDeleting 
        ? currentWord.substring(0, charIndex--) 
        : currentWord.substring(0, charIndex++);

    typingElement.textContent = visibleText;

    let typeSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', typeEffect);


/* ==================== 6. BACKGROUND ==================== */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2; 
        this.speedX = (Math.random() * 0.5) - 0.25;
        this.speedY = (Math.random() * 0.5) - 0.25;
        this.opacity = Math.random() * 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = `rgba(150, 150, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Inicializar
function initParticles() {
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Animar
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

// Responsividade
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();

/* ==================== 7. MENU ATIVO NO SCROLL ==================== */
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    })
}
window.addEventListener('scroll', scrollActive);