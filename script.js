/* =============================================
   ARVIND G — PORTFOLIO | JAVASCRIPT
   ============================================= */

// ── Navbar scroll effect ──────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Typewriter ────────────────────────────────
const words = [
  'agentic AI systems.',
  'intelligent data pipelines.',
  'LLM-powered applications.',
  'cloud-native AI platforms.',
  'things that matter.',
];
let wordIdx = 0, charIdx = 0, deleting = false;
const el = document.getElementById('typewriter');

function type() {
  const word = words[wordIdx];
  if (!deleting) {
    el.textContent = word.slice(0, ++charIdx);
    if (charIdx === word.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    el.textContent = word.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
    }
  }
  setTimeout(type, deleting ? 55 : 90);
}
type();

// ── Scroll reveal ─────────────────────────────
const revealEls = document.querySelectorAll(
  '.section-tag, .section-title, .about-grid, .skill-card, .project-card, .contact-sub, .contact-grid, .highlight-item, .tl-card, .edu-card, .cert-card, .accolade-item'
);
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 4 === 1) el.classList.add('reveal-delay-1');
  if (i % 4 === 2) el.classList.add('reveal-delay-2');
  if (i % 4 === 3) el.classList.add('reveal-delay-3');
});

const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

// ── Skill bar animation ───────────────────────
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.w + '%';
        });
        barObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 }
);
document.querySelectorAll('.skill-card').forEach(c => barObserver.observe(c));

// ── Counter animation ─────────────────────────
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.stat-num').forEach(animateCounter);
        counterObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 }
);
const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObs.observe(heroStats);

// ── Particle canvas ───────────────────────────
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.5 + 0.3;
    this.speed = Math.random() * 0.4 + 0.1;
    this.angle = Math.random() * Math.PI * 2;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '99,102,241' : '6,182,212';
  }
  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.angle) * 0.3;
    this.angle += 0.01;
    if (this.y < -10) this.reset(), this.y = H + 10;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 90; i++) particles.push(new Particle());

function animParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animParticles);
}
animParticles();

// ── Contact form ──────────────────────────────
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message 🚀';
    btn.disabled = false;
    this.reset();
    const msg = document.getElementById('form-success');
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 4000);
  }, 1200);
});

// ── Active nav link highlight ─────────────────
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
}, { passive: true });
