// ── Copy email to clipboard ──
function copyEmail(btn) {
  navigator.clipboard.writeText(btn.dataset.email).then(() => {
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 500);
  });
}

// ── Smooth scroll for nav links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Highlight active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--text)';
        }
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(section => observer.observe(section));
