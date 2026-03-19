// ── Copy email to clipboard ──
function copyEmail(btn) {
  const email = btn.dataset.email;
  const onSuccess = () => {
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 500);
  };

  // execCommand fallback (Safari 포함 모든 브라우저 호환)
  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = email;
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); onSuccess(); } catch (e) {}
    document.body.removeChild(ta);
  };

  if (navigator.clipboard) {
    navigator.clipboard.writeText(email).then(onSuccess).catch(fallback);
  } else {
    fallback();
  }
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
