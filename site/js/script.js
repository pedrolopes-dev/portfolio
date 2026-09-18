// Menu mobile
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Acessibilidade: Fechar menu mobile com a tecla "Escape"
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// Animação das barras de habilidade ao entrar na viewport
const bars = document.querySelectorAll('.bar-fill');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.pct + '%';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

bars.forEach(bar => observer.observe(bar));

// Dots do carrossel de projetos (navegação simples)
const dots = document.querySelectorAll('.dot');
dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    dots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
  });
});