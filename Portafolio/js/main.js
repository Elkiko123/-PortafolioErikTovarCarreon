/* ===================================================
   main.js — JavaScript del portafolio principal
   Usado por: index.html
=================================================== */

// ── Theme toggle ──
const toggle = document.getElementById('themeToggle');
const root = document.documentElement;
const stored = localStorage.getItem('theme');
if (stored === 'light') root.setAttribute('data-theme', 'light');
toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ── Navbar scroll border ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Fade-up on scroll ──
const faders = document.querySelectorAll('.fade-up, .project-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
faders.forEach(el => observer.observe(el));

// ── Lightbox ──
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.getElementById('lightboxClose');

document.querySelectorAll('.project-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const img = thumb.querySelector('img');
        if (img) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || 'Proyecto';
            const card = thumb.closest('.project-card');
            const title = card.querySelector('h4')?.textContent || 'Proyecto';
            lightboxCaption.textContent = title;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    });
});

const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
};
if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
if(lightbox) lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// ── Custom Cursor ──
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');
if(cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 150, fill: "forwards" });
    });
    document.querySelectorAll('a, button, .project-thumb, .filter-btn').forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}

// ── Typewriter Effect ──
const twElement = document.getElementById('typewriter');
if (twElement) {
    const text = twElement.getAttribute('data-text');
    let idx = 0;
    const type = () => {
        if (idx < text.length) {
            twElement.textContent += text.charAt(idx);
            idx++;
            setTimeout(type, 100);
        }
    };
    setTimeout(type, 500);
}

// ── Scroll Top & Active Nav ──
const scrollTopBtn = document.getElementById('scrollTopBtn');
const sections = document.querySelectorAll('section');
const navLinksItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
        if (window.scrollY > 300) scrollTopBtn.classList.add('show');
        else scrollTopBtn.classList.remove('show');
    }
    let current = '';
    sections.forEach(sec => {
        const sectionTop = sec.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
            current = sec.getAttribute('id');
        }
    });
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

if(scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Stats and Skills Animation ──
const statNums = document.querySelectorAll('.stat-num');
const skillBars = document.querySelectorAll('.skill-progress');

const animateStats = (el) => {
    const target = +el.getAttribute('data-target');
    const increment = target / 50;
    let current = 0;
    const update = () => {
        current += increment;
        if (current < target) {
            el.innerText = Math.ceil(current);
            requestAnimationFrame(update);
        } else {
            el.innerText = target;
        }
    };
    update();
};

const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stat-num')) {
                animateStats(entry.target);
            } else if (entry.target.classList.contains('skill-progress')) {
                entry.target.style.width = entry.target.getAttribute('data-width');
            }
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNums.forEach(num => statsObserver.observe(num));
skillBars.forEach(bar => statsObserver.observe(bar));

// ── Project Filters ──
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hide');
                card.classList.remove('visible');
                setTimeout(() => card.classList.add('visible'), 50);
            } else {
                card.classList.add('hide');
            }
        });
    });
});
