/* ===================================================
   project.js — JavaScript para páginas de proyectos
   Usado por: pages/*.html
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

// ── Fade-up on scroll ──
const faders = document.querySelectorAll('.fade-up');
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

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || 'Captura de pantalla';
            const caption = item.dataset.caption || item.querySelector('.caption')?.textContent || 'Captura';
            lightboxCaption.textContent = caption;
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
    document.querySelectorAll('a, button, .gallery-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}

// ── Scroll Top & Read Progress ──
const scrollTopBtn = document.getElementById('scrollTopBtn');
const readProgress = document.getElementById('readProgress');

window.addEventListener('scroll', () => {
    // Scroll Top Button
    if (scrollTopBtn) {
        if (window.scrollY > 300) scrollTopBtn.classList.add('show');
        else scrollTopBtn.classList.remove('show');
    }

    // Read Progress
    if (readProgress) {
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollPx / winHeightPx) * 100;
        readProgress.style.width = scrolled + '%';
    }
});

if(scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
