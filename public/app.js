const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
function closeMenu() {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    menu.focus();
  }
});

const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-category]');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  let visible = 0;
  cards.forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) visible++;
  });
  document.querySelector('#filter-status').textContent = `${visible} ${visible === 1 ? 'momento exibido' : 'momentos exibidos'}.`;
}));

const preference = matchMedia('(prefers-reduced-motion: reduce)');
const hero = document.querySelector('.hero');
const visual = document.querySelector('.hero-visual');
let frame = 0;
function animateScroll() {
  frame = 0;
  if (preference.matches) return;
  const rect = hero.getBoundingClientRect();
  if (rect.bottom < 0) return;
  const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
  visual.style.setProperty('--wheel', `${-10 + progress * 65}deg`);
}
function requestScrollFrame() {
  if (!frame) frame = requestAnimationFrame(animateScroll);
}
window.addEventListener('scroll', requestScrollFrame, { passive: true });
visual.addEventListener('pointermove', event => {
  if (preference.matches || event.pointerType === 'touch') return;
  const rect = visual.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - .5;
  const y = (event.clientY - rect.top) / rect.height - .5;
  visual.style.setProperty('--tilt-x', `${-y * 12}deg`);
  visual.style.setProperty('--tilt-y', `${x * 12}deg`);
});
function resetMotion() {
  visual.style.setProperty('--tilt-x', '0deg');
  visual.style.setProperty('--tilt-y', '0deg');
  if (preference.matches) visual.style.setProperty('--wheel', '-10deg');
  else requestScrollFrame();
}
visual.addEventListener('pointerleave', resetMotion);
preference.addEventListener('change', resetMotion);

if ('IntersectionObserver' in window && !preference.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: .1 });
  document.querySelectorAll('.section h2, .path-grid article, .belief-line span').forEach(element => {
    element.classList.add('reveal-ready');
    observer.observe(element);
  });
}
