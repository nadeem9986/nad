/* =====================================================
   portfolio.js — Smooth scrolling, fade-in, nav, contact
   ===================================================== */

'use strict';

// ── NAVBAR: scroll state + active link ─────────────────
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Scrolled state for frosted glass
  navbar.classList.toggle('scrolled', window.scrollY > 30);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

// ── HAMBURGER MENU ─────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

// Close on nav link click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

// ── FADE-UP INTERSECTION OBSERVER ──────────────────────
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire once
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

fadeEls.forEach(el => observer.observe(el));

// ── SMOOTH SCROLL for all internal links ───────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 68; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── CONTACT FORM → mailto fallback ─────────────────────
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formNote = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !message) {
      formNote.textContent = 'Please fill in all fields.';
      formNote.classList.add('error');
      return;
    }

    // Build mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailto = `mailto:nadeemise2025@gmail.com?subject=${subject}&body=${body}`;

    // Feedback for user
    submitBtn.textContent = 'Opening your email client… ✓';
    submitBtn.disabled = true;
    formNote.textContent = '';
    formNote.classList.remove('error');

    window.location.href = mailto;

    setTimeout(() => {
      submitBtn.textContent = 'Send Message →';
      submitBtn.disabled = false;
      formNote.textContent = 'Message drafted! Your email client should have opened.';
      form.reset();
    }, 2500);
  });
}

// ── SKILL BAR ANIMATION on scroll ─────────────────────
const barFills = document.querySelectorAll('.pui-bar-fill');

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.style.width;
        fill.style.width = '0%';
        requestAnimationFrame(() => {
          setTimeout(() => { fill.style.transition = 'width 1.2s ease'; fill.style.width = width; }, 100);
        });
        barObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.5 }
);

barFills.forEach(el => barObserver.observe(el));

