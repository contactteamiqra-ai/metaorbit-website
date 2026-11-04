// Homepage-only, native-scroll choreography. No wheel/touch interception or continuous idle loop.
export function initHomeMotion(motion) {
  const hero=document.querySelector('.hero');
  const features=[...document.querySelectorAll('.service-feature')];
  const intro=document.querySelector('.home-intro');
  const path=document.querySelector('#workflow-pulse-path');
  const pulse=document.querySelector('.workflow-pulse');
  const clamp=n=>Math.max(0,Math.min(1,n));
  let scheduled=false;
  const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}},{threshold:.15});
  document.querySelectorAll('.feature-copy, .home-agency, .story-heading, .home-work-link, .home-connect').forEach(e=>observer.observe(e));
  function update(){scheduled=false;const reduced=motion.matches;
    const hp=reduced?0:clamp((scrollY-40)/(hero.offsetHeight*.85));hero.style.setProperty('--hero-progress',hp.toFixed(4));
    const ir=intro.getBoundingClientRect();intro.style.setProperty('--intro-progress',reduced?1:clamp((innerHeight*.9-ir.top)/(innerHeight*.8)).toFixed(4));
    for(const feature of features){const r=feature.querySelector('.service-visual').getBoundingClientRect();if(!reduced&&r.top>innerHeight)continue;const p=reduced||r.bottom<0?1:clamp((innerHeight*.9-r.top)/(innerHeight*.55+r.height*.2));const phase=p<.34?'0':p<.68?'1':'2';feature.style.setProperty('--service-progress',p.toFixed(4));feature.dataset.phase=phase;
      if(feature.dataset.service==='website')feature.querySelector('.bag-count b').textContent=p>.55?'1':'0';
      if(feature.dataset.service==='automation'){const pt=path.getPointAtLength(path.getTotalLength()*p);pulse.setAttribute('cx',pt.x);pulse.setAttribute('cy',pt.y);}
      if(feature.dataset.service==='crm')feature.querySelector('.lead-state').textContent=['Enquiry received','Context organised','Ready for a next step'][Number(phase)];
    }
    document.documentElement.classList.toggle('home-reduced-motion',reduced);
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
  document.documentElement.classList.add('home-motion-ready');
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});motion.addEventListener('change',schedule);update();
}
