import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Scroll suave ----------
if (!reduce) {
  try {
    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const el = document.querySelector(a.getAttribute('href'));
        if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: 0 }); }
      });
    });
  } catch (_) {}
}

if (reduce) {
  window.addEventListener('load', () => ScrollTrigger.refresh());
  // skip all motion
} else {
  const mm = gsap.matchMedia();

  // ---------- 1. HERO: pin + parallax + mouse ----------
  mm.add({ desk: '(min-width: 821px)', mob: '(max-width: 820px)' }, (ctx) => {
    const desk = ctx.conditions.desk;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: desk ? '+=150%' : '+=80%',
        scrub: 1,
        pin: true,
      },
    });

    tl.to('.hero .fondo',   { yPercent: -30, ease: 'none' }, 0)
      .to('.hero .marca',   { yPercent: -55, scale: .9, ease: 'none' }, 0)
      .to('.hero .aro',     { rotation: -18, scale: 1.15, ease: 'none' }, 0)
      .to('.hero .pouch',   { yPercent: -28, rotation: 8, scale: 1.08, ease: 'none' }, 0)
      .to('.hero .c1',      { x: -80, y: -140, ease: 'none' }, 0)
      .to('.hero .c2',      { x: 80,  y: -160, ease: 'none' }, 0)
      .to('.t1',            { y: -520, x: 120,  rotation: 140,  ease: 'none' }, 0)
      .to('.t2',            { y: -380, x: -80,  rotation: -110, ease: 'none' }, 0)
      .to('.t3',            { y: -700, x: -160, rotation: 200,  ease: 'none' }, 0)
      .to('.t4',            { y: -260, x: 60,   rotation: 70,   ease: 'none' }, 0)
      .to('.d-estrella',    { y: -300, rotation: 240, ease: 'none' }, 0)
      .to('.d-garabato',    { y: -420, x: 80, rotation: -30, ease: 'none' }, 0)
      .to('.d-numeral',     { y: -260, rotation: 60, ease: 'none' }, 0)
      .to('.hero .slogan',  { yPercent: -180, scale: 1.1, ease: 'none' }, 0);

    // Mouse parallax (solo desktop)
    if (desk) {
      const hero = document.querySelector('.hero');
      const layers = [
        ['.pouch',  14], ['.aro',  6],
        ['.t1', 40], ['.t2', 30], ['.t3', 45], ['.t4', 22],
        ['.d-estrella', 26], ['.d-garabato', 30],
      ].map(([sel, f]) => ({
        x: gsap.quickTo('.hero ' + sel, 'xPercent', { duration: .8, ease: 'power3' }),
        f,
      }));

      const onMove = (e) => {
        const r = hero.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - .5;
        layers.forEach((l) => l.x(nx * l.f * -.6));
      };

      hero.addEventListener('pointermove', onMove);
      return () => hero.removeEventListener('pointermove', onMove);
    }
  });

  // ---------- 2. CONOCÉ: texto por palabras + SVG dibujado ----------
  const heading = document.querySelector('.conoce .split');
  if (heading) {
    heading.innerHTML = heading.textContent
      .split(' ')
      .map((w) => `<span class="w">${w}</span>`)
      .join(' ');

    gsap.to('.conoce .split .w', {
      opacity: 1,
      stagger: .3,
      ease: 'none',
      scrollTrigger: { trigger: '.conoce', start: 'top 75%', end: 'top 20%', scrub: true },
    });
  }

  const trazado = document.querySelector('.conoce .dibujar');
  if (trazado) {
    const L = trazado.getTotalLength();
    gsap.set(trazado, { strokeDasharray: L, strokeDashoffset: L * 0.15 });
    gsap.fromTo(trazado,
      { strokeDashoffset: L },
      { strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: '.conoce .pila', start: 'top 85%', end: 'center 45%', scrub: true } }
    );
  }

  gsap.fromTo('.conoce .pila img',
    { yPercent: 12, rotation: -4 },
    { yPercent: -8,  rotation:  2, ease: 'none',
      scrollTrigger: { trigger: '.conoce', start: 'top bottom', end: 'bottom top', scrub: true } }
  );

  // Cursor parallax en .pila (desktop)
  mm.add('(min-width: 821px)', () => {
    const sec = document.querySelector('.conoce');
    if (!sec) return;
    const pila = sec.querySelector('.pila');
    const pairs = [
      [pila.querySelector('img'),      9],
      [pila.querySelector('.flechas'), 3],
      [pila.querySelector('.attr-1'),  13],
      [pila.querySelector('.attr-2'),  13],
      [pila.querySelector('.attr-3'),  7],
      [pila.querySelector('.aro-svg'), 4],
    ];
    const qs = pairs
      .filter(([el]) => el)
      .map(([el, f]) => ({
        x: gsap.quickTo(el, 'x', { duration: .9, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: .9, ease: 'power3' }),
        f,
      }));

    const onMove = (e) => {
      const r = sec.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width  - .5;
      const ny = (e.clientY - r.top)  / r.height - .5;
      qs.forEach((q) => { q.x(nx * q.f * -.7); q.y(ny * q.f * -.7); });
    };

    sec.addEventListener('pointermove', onMove);
    return () => sec.removeEventListener('pointermove', onMove);
  });

  // ---------- 3. PRODUCTOS: scroll horizontal + linger + color por sabor ----------
  mm.add('(min-width: 821px)', () => {
    const pista  = document.querySelector('.pista');
    const panels = gsap.utils.toArray('.panel');
    if (!pista || !panels.length) return;

    const dist = () => pista.scrollWidth - window.innerWidth;

    const hz = gsap.to(pista, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.productos',
        start: 'top top',
        end: () => '+=' + dist(),
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    const cols = panels.map((el) => el.dataset.color);
    const bg = gsap.timeline({
      scrollTrigger: {
        trigger: '.productos',
        start: 'top top',
        end: () => '+=' + dist(),
        scrub: true,
      },
    });
    cols.slice(1).forEach((c) => bg.to('.productos', { backgroundColor: c, ease: 'none', duration: 1 }));

    panels.forEach((el) => {
      const img = el.querySelector('img');
      if (!img) return;
      gsap.fromTo(img,
        { rotation: -14, yPercent: 10, scale: .9 },
        { rotation: 10,  yPercent: -6, scale: 1,  ease: 'none',
          scrollTrigger: {
            trigger: el,
            containerAnimation: hz,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        }
      );
    });

  });

  // ---------- 4. POR QUÉ: contadores + sellos + cintas ----------
  document.querySelectorAll('.cnt').forEach((el) => {
    const to = +el.dataset.to;
    if (isNaN(to)) return;
    const o = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(o, { v: 0 }, {
          v: to, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(o.v); },
        });
      },
    });
  });

  gsap.fromTo('.sello',
    { rotation: -60, scale: .6 },
    { rotation: 12, scale: 1, stagger: .1, ease: 'back.out(2)',
      scrollTrigger: { trigger: '.stats', start: 'top 85%', end: 'top 45%', scrub: true } }
  );

  gsap.fromTo('.cinta.a .in', { xPercent: 0 },
    { xPercent: -35, ease: 'none',
      scrollTrigger: { trigger: '.cintas', start: 'top bottom', end: 'bottom top', scrub: true } }
  );
  gsap.fromTo('.cinta.b .in', { xPercent: -35 },
    { xPercent: 0, ease: 'none',
      scrollTrigger: { trigger: '.cintas', start: 'top bottom', end: 'bottom top', scrub: true } }
  );

  // ---------- 5. DÍA A DÍA: cartas apiladas ----------
  const cartas = gsap.utils.toArray('.carta');
  cartas.forEach((c, i) => {
    gsap.fromTo(c.querySelector('.fotos'),
      { yPercent: -8 },
      { yPercent:  8, ease: 'none',
        scrollTrigger: { trigger: c, start: 'top bottom', end: 'bottom top', scrub: true } }
    );
    if (i < cartas.length - 1) {
      gsap.fromTo(c,
        { scale: 1, rotation: 0, filter: 'brightness(1)' },
        { scale: .93, rotation: i % 2 ? 1.5 : -1.5, filter: 'brightness(.93)', ease: 'none',
          scrollTrigger: { trigger: cartas[i + 1], start: 'top bottom', end: 'top 30%', scrub: true } }
      );
    }
  });

  // ---------- 6. DISTRIBUIDORES: abanico ----------
  const fan = gsap.utils.toArray('.abanico img');
  if (fan.length) {
    gsap.fromTo(fan,
      { rotation: 0 },
      {
        rotation: (i) => (i - (fan.length - 1) / 2) * 14,
        x:        (i) => (i - (fan.length - 1) / 2) * 18,
        ease: 'none',
        scrollTrigger: { trigger: '.distri', start: 'top 80%', end: 'center 55%', scrub: true },
      }
    );
  }

  // ---------- 7. CONTACTO: letras del logo ----------
  gsap.fromTo('.gigante span',
    { yPercent: (i) => 60 + i * 25 },
    { yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: '.pie', start: 'top 85%', end: 'bottom bottom', scrub: true } }
  );

  window.addEventListener('load', () => ScrollTrigger.refresh());
}
