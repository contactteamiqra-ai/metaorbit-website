// Native scroll controls the connected service chapters and the content INSIDE each device.
// No wheel interception, nested scroll traps, autoplay, or artificial page scroll speed.
export function initHomeMotion(motion){
 const hero=document.querySelector('.hero');
 const journey=document.querySelector('.connected-journey');
 const chapters=[...document.querySelectorAll('.service-chapter')];
 const showcase=document.querySelector('.showcase-scroll');
 const stage=document.querySelector('.device-stage');
 const laptopViewport=document.querySelector('.laptop-viewport');
 const laptopPage=document.querySelector('.laptop-page');
 const phoneViewport=document.querySelector('.phone-viewport');
 const phonePage=document.querySelector('.phone-page');
 const desktop=matchMedia('(min-width: 901px)');
 const clamp=n=>Math.max(0,Math.min(1,n));
 let frame=0, laptopTravel=0,phoneTravel=0;
 function measure(){laptopTravel=Math.max(0,laptopPage.scrollHeight-laptopViewport.clientHeight);phoneTravel=Math.max(0,phonePage.scrollHeight-phoneViewport.clientHeight);schedule();}
 function update(){frame=0;const reduced=motion.matches;const hp=reduced?0:clamp((scrollY-30)/(hero.offsetHeight*.9));hero.style.setProperty('--hero-progress',hp.toFixed(4));
  let nearest=0,distance=Infinity;
  for(const [i,chapter] of chapters.entries()){const r=chapter.getBoundingClientRect();const visual=chapter.querySelector('.mobile-service-demo').getBoundingClientRect();const local=innerWidth>=1000?r:visual;const p=reduced?1:clamp((innerHeight*.8-local.top)/(innerHeight*.55+local.height*.25));chapter.style.setProperty('--chapter-progress',p.toFixed(4));const d=Math.abs(r.top+r.height*.5-innerHeight*.5);if(d<distance){nearest=i;distance=d;}}
  journey.dataset.chapter=reduced?'0':String(nearest);chapters.forEach((chapter,i)=>chapter.classList.toggle('is-current',i===nearest));
  const jr=journey.getBoundingClientRect();const all=reduced?1:clamp((innerHeight*.45-jr.top)/Math.max(1,jr.height-innerHeight*.5));journey.style.setProperty('--journey-progress',all.toFixed(4));journey.style.setProperty('--chapter-progress',chapters[nearest].style.getPropertyValue('--chapter-progress'));document.querySelector('.studio-counter').textContent=`0${nearest+1} / 03`;
  let progress=0;
  if(!reduced){if(desktop.matches){const r=showcase.getBoundingClientRect();progress=clamp((24-r.top)/Math.max(1,showcase.offsetHeight-stage.offsetHeight));}else{const r=phoneViewport.getBoundingClientRect();progress=clamp((innerHeight*.82-r.top)/(innerHeight*.6+r.height*.2));}}
  showcase.style.setProperty('--showcase-progress',progress.toFixed(4));
  laptopPage.style.transform=`translate3d(0,${(-progress*laptopTravel).toFixed(2)}px,0)`;
  const phoneProgress=reduced?.16:(desktop.matches?.12+progress*.83:progress);
  phonePage.style.transform=`translate3d(0,${(-phoneProgress*phoneTravel).toFixed(2)}px,0)`;
  document.documentElement.classList.toggle('home-reduced-motion',reduced);
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(update);}
 document.documentElement.classList.add('home-motion-ready');
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',measure,{passive:true});motion.addEventListener('change',measure);desktop.addEventListener('change',measure);
 new ResizeObserver(measure).observe(laptopViewport);new ResizeObserver(measure).observe(phoneViewport);new ResizeObserver(measure).observe(laptopPage);new ResizeObserver(measure).observe(phonePage);
 for(const image of document.querySelectorAll('.devices img'))if(!image.complete)image.addEventListener('load',measure,{once:true});
 document.fonts.ready.then(measure);measure();update();
}
