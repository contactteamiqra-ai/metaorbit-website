document.documentElement.classList.add('js-enabled');
import { services } from './content.js';
import { initOrbit } from './orbit.js';
import { initExperience } from './experience.js';
for (const service of services) {
  const row = document.getElementById(service.id);
  row.querySelector('h3').textContent = service.title;
  row.querySelector('.service-intro').textContent = service.intro;
  row.querySelector('.service-description').textContent = service.description;
  row.querySelector('ul').replaceChildren(...service.items.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
}
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
function closeMenu() { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); });
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); toggle.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
const motion = matchMedia('(prefers-reduced-motion: reduce)');
initExperience(motion);
document.querySelector('button[type=submit]').disabled = false;
document.querySelector('#contact-form').addEventListener('submit', event => { event.preventDefault(); document.querySelector('#form-status').textContent = 'Your details pass the field checks. Nothing was sent or saved: this preview has no connected contact service.'; });
document.querySelector('#year').textContent = new Date().getFullYear();
try { initOrbit(document.querySelector('#orbit'), motion); } catch { /* The original SVG remains visible if WebGL is unavailable. */ }
