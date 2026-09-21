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

// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  // Cria o container das faíscas no corpo da página
  const container = document.createElement('div');
  container.className = 'lightning-container';
  document.body.appendChild(container);

  let lastX = 0;
  let lastY = 0;

  document.addEventListener('mousemove', (e) => {
    // Cria uma faísca a cada movimento significativo do mouse
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    
    if (dist > 8) { // Sensibilidade do rastro
      createShockParticle(e.clientX, e.clientY, container);
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });
});

// === EFEITO DE CURSOR PISCANDO NO LOGO (TERMINAL) ===
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona o container do logo (baseado na sua classe .brand do CSS)
  const brandLogo = document.querySelector('.brand');
  
  if (brandLogo) {
    // 1. Cria o elemento visual do cursor
    const cursor = document.createElement('span');
    
    // 2. Aplica os estilos diretamente para ficar igual a um bloco de terminal
    cursor.style.display = 'inline-block';
    cursor.style.width = '8px';           // Largura do bloquinho
    cursor.style.height = '1.1em';        // Altura acompanhando o tamanho da fonte
    cursor.style.backgroundColor = 'var(--accent-1)'; // Usa o seu ciano (variável do CSS)
    cursor.style.marginLeft = '4px';      // Distância do nome "Pedro"
    cursor.style.verticalAlign = 'text-bottom'; // Alinhamento com a base da letra
    cursor.style.borderRadius = '2px';
    cursor.style.opacity = '1';
    
    // 3. Adiciona o cursor no HTML ao lado do nome
    brandLogo.appendChild(cursor);
    
    // 4. Lógica de Animação: Alterna a opacidade para criar o efeito de piscar
    setInterval(() => {
      cursor.style.opacity = cursor.style.opacity === '1' ? '0' : '1';
    }, 530); // 530ms é um tempo muito natural e agradável (padrão de sistemas operacionais)
  }
});



//Matrix
// ==========================================
// 1. CHUVA DE CÓDIGO MATRIX NO FUNDO
// ==========================================
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initMatrix();
});

const matrixChars = '01::..▪▫-+=*¦|¡!µ§µαβγδε';
const fontSize = 9;
let drops = [];

function initMatrix() {
  let columns = Math.floor(width / fontSize);
  drops = [];
  
  for (let i = 0; i < columns; i++) {
    drops.push({
      x: i * fontSize,
      y: Math.random() * -height,    // Começa em alturas aleatórias acima da tela
      speed: (Math.random() * 0.12 + 0.05) * fontSize // Velocidade de queda bem lenta
    });
  }
}
initMatrix();

function animate() {
  // Limpeza do fundo com opacidade para criar o rastro (PRETO ABSOLUTO)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.fillRect(0, 0, width, height);

  // Estilo da fonte e brilho verde Matrix
  ctx.font = `${fontSize}px monospace`;
  ctx.shadowBlur = 4;
  ctx.shadowColor = '#22c55e';
  ctx.fillStyle = '#4ade80';

  for (let i = 0; i < drops.length; i++) {
    let drop = drops[i];

    // Atualiza a posição apenas no eixo Y (Queda livre e constante)
    drop.y += drop.speed;

    // Escolhe um caractere aleatório e desenha na tela
    const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    ctx.fillText(char, drop.x, drop.y);

    // Quando a gota sai da tela por baixo
    if (drop.y > height && Math.random() > 0.99) {
      drop.y = Math.random() * -100; // Joga de volta pra cima para recomeçar o ciclo
    }
  }

  // Remove o brilho para não interferir na limpeza do frame seguinte
  ctx.shadowBlur = 0;

  requestAnimationFrame(animate);
}

animate();

