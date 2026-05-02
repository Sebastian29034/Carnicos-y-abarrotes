/* ===========================
   PAGE LOADER
=========================== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
  }, 1400);
});

/* ===========================
   SCROLL REVEAL (IntersectionObserver)
=========================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===========================
   NAVBAR: scroll shrink + active links
=========================== */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Shrink navbar
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Back-to-top visibility
  const backTop = document.getElementById('back-top');
  backTop.classList.toggle('visible', window.scrollY > 400);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ===========================
   HAMBURGER MENU
=========================== */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

/* ===========================
   BACK TO TOP
=========================== */
document.getElementById('back-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===========================
   TOAST NOTIFICATION
=========================== */
function showToast(msg, duration = 2800) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* ===========================
   ANIMATED STAT COUNTERS
=========================== */
function animateCounter(el, target, duration = 1800) {
  const suffix = el.querySelector('.stat-suffix');
  const suffixText = suffix ? suffix.outerHTML : '';
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.innerHTML = Math.floor(start) + suffixText;
    if (start >= target) clearInterval(timer);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      animateCounter(el, target);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => statsObserver.observe(el));

/* ===========================
   AGREGAR AL CARRITO (counter)
=========================== */
const counts = {};

document.querySelectorAll('.btn-agregar').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const id = btn.dataset.id;
    counts[id] = (counts[id] || 0) + 1;

    const counter = document.getElementById('cnt-' + id);
    counter.textContent = counts[id];
    counter.classList.add('show');

    // Button feedback
    btn.textContent = '✓ Agregado';
    btn.style.background = '#065F46';
    setTimeout(() => {
      btn.textContent = '+ Agregar';
      btn.style.background = '';
    }, 1200);

    const productName = btn.closest('.producto-card').querySelector('h3').textContent;
    showToast('🛒 ' + productName + ' agregado al pedido');
  });
});

/* ===========================
   FORM SUBMIT (demo)
=========================== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    btn.textContent = 'Enviando...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    setTimeout(() => {
      contactForm.style.display = 'none';
      document.getElementById('formSuccess').classList.add('show');
    }, 1500);
  });
}

/* ===========================
   PARALLAX HERO PARTICLES (subtle)
=========================== */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const hero = document.querySelector('.hero');
  if (hero && scrollY < window.innerHeight) {
    hero.style.backgroundPositionY = scrollY * 0.3 + 'px';
  }
}, { passive: true });