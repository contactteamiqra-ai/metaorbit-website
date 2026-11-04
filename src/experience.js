// Native-scroll choreography: all content remains HTML and all scenes have static fallbacks.
export function initExperience(motion) {
  const root = document.documentElement;
  const chapters = [...document.querySelectorAll('.service-chapter')];
  const journey = document.querySelector('.service-journey');
  const scenes = [...document.querySelectorAll('.stage-scene')];
  const work = [...document.querySelectorAll('.work-item')];
  const process = document.querySelector('.process-timeline');
  const steps = [...process.querySelectorAll('article')];
  const hero = document.querySelector('.hero');
  const desktop = matchMedia('(min-width: 1000px)');
  const clamp = x => Math.max(0, Math.min(1, x));
  let queued = false;
  // Line masks give headings their own editorial entrance, without hiding text from AT.
  for (const heading of document.querySelectorAll('h1, h2')) {
    const lines = heading.innerHTML.split(/<br\s*\/?\s*>/i);
    heading.innerHTML = lines.map((line, i) => `<span class="headline-line" style="--line:${i}"><span>${line}</span></span>`).join('');
    heading.classList.add('headline-reveal');
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('in-view', 'visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: .12 });
  document.querySelectorAll('.reveal, .headline-reveal, .problem-list article, .agency-strip').forEach(el => observer.observe(el));
  function update() {
    queued = false;
    const height = innerHeight;
    const reduced = motion.matches;
    const heroRect = hero.getBoundingClientRect();
    const heroP = reduced ? 0 : clamp(-heroRect.top / Math.max(1, heroRect.height - height * .5));
    hero.style.setProperty('--hero-progress', heroP.toFixed(4));
    let nearest = 0, distance = Infinity;
    chapters.forEach((chapter, i) => {
      const rect = chapter.getBoundingClientRect();
      const progress = clamp((height * .8 - rect.top) / (rect.height + height * .15));
      chapter.style.setProperty('--chapter-progress', reduced ? '.65' : progress.toFixed(4));
      const d = Math.abs(rect.top + rect.height * .4 - height * .5);
      if (d < distance) { nearest = i; distance = d; }
      chapter.classList.toggle('chapter-entered', rect.top < height * .8);
    });
    journey.dataset.active = String(nearest);
    scenes.forEach((scene, i) => {
      const active = i === nearest;
      scene.classList.toggle('is-active', active);
      scene.style.setProperty('--chapter-progress', chapters[i].style.getPropertyValue('--chapter-progress'));
    });
    document.querySelector('.chapter-counter').textContent = `0${nearest + 1} / 03`;
    work.forEach(item => {
      const rect = item.getBoundingClientRect();
      const p = reduced ? 1 : clamp((height * .95 - rect.top) / (height * .7));
      item.style.setProperty('--work-reveal', p.toFixed(4));
    });
    const processRect = process.getBoundingClientRect();
    let pathProgress;
    if (desktop.matches) pathProgress = clamp((height * .9 - processRect.top) / (height * .65));
    else pathProgress = clamp((height * .7 - processRect.top) / Math.max(1, processRect.height - height * .15));
    process.style.setProperty('--path-progress', reduced ? 1 : pathProgress.toFixed(4));
    steps.forEach((step, i) => {
      const active = reduced || (desktop.matches ? pathProgress >= i / 3 : step.getBoundingClientRect().top < height * .72);
      step.classList.toggle('step-active', active);
    });
    root.classList.toggle('reduced-experience', reduced);
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  root.classList.add('experience-ready');
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  motion.addEventListener('change', schedule);
  desktop.addEventListener('change', schedule);
  // Depth response is confined to a decorative preview; keyboard focus and links remain stable.
  for (const item of work) {
    item.addEventListener('pointermove', event => {
      if (motion.matches || event.pointerType === 'touch') return;
      const rect = item.getBoundingClientRect();
      item.style.setProperty('--tilt-x', `${((event.clientY - rect.top) / rect.height - .5) * -6}deg`);
      item.style.setProperty('--tilt-y', `${((event.clientX - rect.left) / rect.width - .5) * 8}deg`);
    });
    item.addEventListener('pointerleave', () => { item.style.setProperty('--tilt-x', '0deg'); item.style.setProperty('--tilt-y', '0deg'); });
  }
  update();
}
