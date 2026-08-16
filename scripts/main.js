const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const year = document.querySelector('[data-year]');

year.textContent = new Date().getFullYear();

const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 18);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
};

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item, index) => {
    if (item.closest('.hero')) item.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
