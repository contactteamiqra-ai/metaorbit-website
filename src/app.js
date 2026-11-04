document.documentElement.classList.add('js-enabled');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
const services=document.querySelector('.services-menu');
function closeMenu(){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');services.open=false;}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);if(!open)services.open=false;});
nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;if(services.open){services.open=false;services.querySelector('summary').focus();}else if(nav.classList.contains('is-open')){closeMenu();toggle.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
const form=document.querySelector('#contact-form');
if(form){form.addEventListener('submit',event=>{event.preventDefault();document.querySelector('#form-status').textContent='Your details pass the field checks. Nothing was sent or saved: this preview has no connected contact service.';});form.querySelector('button[type=submit]').disabled=false;}
const canvas=document.querySelector('#orbit');
if(canvas){import('./orbit.js').then(({initOrbit})=>initOrbit(canvas,matchMedia('(prefers-reduced-motion: reduce)'))).catch(()=>{/* The original isolated symbol stays visible if WebGL or geometry loading fails. */});}
