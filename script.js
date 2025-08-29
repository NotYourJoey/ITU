// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    mobileMenu.classList.toggle('hidden');
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Scroll reveal
const revealElements = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15 }
);
revealElements.forEach((el) => io.observe(el));

// Contact form -> mailto fallback
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const subject = encodeURIComponent(`Trip inquiry from ${name || 'Traveler'}`);
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:hello@unknown.tours?subject=${subject}&body=${body}`;
  });
}

// Removed starfield for light tourist theme

// FAQ toggles
const faqToggles = document.querySelectorAll('.faq-toggle');
faqToggles.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const content = btn.parentElement.querySelector('div');
    if (content) content.classList.toggle('hidden');
    const icon = btn.querySelector('svg');
    if (icon) icon.style.transform = expanded ? 'rotate(0deg)' : 'rotate(45deg)';
  });
});

// Parallax + rotation for hero logo
const heroLogo = document.getElementById('heroLogo');
if (heroLogo) {
  const startY = heroLogo.getBoundingClientRect().top + window.scrollY;
  const baseRotate = -8; // more tilt
  const maxRotate = 36; // max rotation
  const translateFactor = 0.65; // stronger parallax
  const maxScale = 1.12;

  let currentY = 0, currentR = baseRotate, currentS = 1;

  const update = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const delta = Math.max(0, scrollY - startY);
    const targetY = delta * translateFactor;
    const targetR = baseRotate + Math.min(maxRotate, delta * 0.09);
    const targetS = 1 + Math.min(maxScale - 1, delta * 0.00035);

    // easing (lerp)
    currentY += (targetY - currentY) * 0.12;
    currentR += (targetR - currentR) * 0.12;
    currentS += (targetS - currentS) * 0.12;

    heroLogo.style.transform = `translate3d(-18px, ${currentY}px, 0) rotate(${currentR}deg) scale(${currentS})`;
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}


