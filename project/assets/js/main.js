(function () {
  // Año dinámico en footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Intersection Observer para revelar elementos
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Preferencia reducida de movimiento
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // Smooth scroll para anclas internas
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Cerrar navbar en mobile
      const navCollapse = document.getElementById('navMain');
      if (navCollapse && navCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navCollapse).toggle();
      }
    });
  });
})();