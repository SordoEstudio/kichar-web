# Kichar Snack — Web Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the Kichar Snack boceto de movimiento to an Astro + Vite project using official brand assets, correct typography, real product images, and a custom 404 page.

**Architecture:** Single Astro page (`index.astro`) assembles 8 section components. A single client-side `animations.js` module drives all GSAP ScrollTrigger and Lenis effects. No framework (React/Vue/Svelte) — plain `.astro` files with scoped CSS. Static output, no SSR.

**Tech Stack:** Astro 5, Vite (bundler), GSAP 3 (npm), Lenis (npm), CSS custom properties, no TypeScript, no Tailwind.

**Spec:** `docs/brand.md`, `docs/notas-boceto.md`, `Kichar · Boceto de movimiento/index.html`

## Global Constraints

- Soft black `#141210` for all on-screen text — never pure `#000000`
- Official HEX palette from `docs/brand.md` — no boceto approximations
- Fonts: PaytoneOne (headlines/frases), Open Sans variable (body), Rock Salt (decorativo corto únicamente)
- Images: Pack1=Clásico, Pack2=Ajo, Pack3=Picante, Pack4=Hot Chili, Pack5=Pimienta, Pack6=Dulce Picante
- Form: `e.preventDefault()` + simulated success message, no backend
- 404: brand palette + pícara/cercana tone, link to inicio
- Breakpoints: 640px (mobile), 820px (tablet-desktop)
- No boceto debug bar, no `.nota` overlays, no `#materiales` section
- Logo para fondos claros: `Logo2.png`; para fondos oscuros: `Logo1.png`

## File Map

```
(root) C:\Users\LENOVO\Documents\GitHub\Kichar-Web\
├── docs/
│   ├── brand.md                          NEW — brand reference
│   ├── notas-boceto.md                   NEW — notas técnicas + tabla materiales
│   └── superpowers/plans/
│       └── 2026-10-30-kichar-web.md      THIS FILE
├── public/
│   ├── fonts/
│   │   ├── PaytoneOne-Regular.ttf        COPY from ENTREGA FINAL
│   │   ├── OpenSans-Variable.ttf         COPY (OpenSans-VariableFont_wdth,wght.ttf)
│   │   └── RockSalt-Regular.ttf          COPY from ENTREGA FINAL
│   └── img/
│       ├── logo-dark.png                 COPY Logo2.png
│       ├── logo-light.png                COPY Logo1.png
│       ├── pack-clasico.png              COPY Pack1.png
│       ├── pack-ajo.png                  COPY Pack2.png
│       ├── pack-picante.png              COPY Pack3.png
│       ├── pack-hot-chili.png            COPY Pack4.png
│       ├── pack-pimienta.png             COPY Pack5.png
│       ├── pack-dulce-picante.png        COPY Pack6.png
│       ├── pila.webp                     COPY from boceto/img/
│       ├── trozo-1.webp                  COPY from boceto/img/
│       ├── trozo-3.webp                  COPY from boceto/img/
│       ├── trozo-4.webp                  COPY from boceto/img/
│       └── trozo-5.webp                  COPY from boceto/img/
├── src/
│   ├── layouts/
│   │   └── Base.astro                    NEW — <html>, <head>, font preloads, global CSS import
│   ├── components/
│   │   ├── Ticker.astro                  NEW — banner promo animado
│   │   ├── Hero.astro                    NEW — parallax 5 capas, logo img, pouch clásico
│   │   ├── Conoce.astro                  NEW — reveal texto + SVG dibujado
│   │   ├── Productos.astro               NEW — scroll horizontal 6 sabores
│   │   ├── PorQue.astro                  NEW — stats + sellos + cintas
│   │   ├── DiaDia.astro                  NEW — cartas apiladas (4 escenas)
│   │   ├── Distribuidores.astro          NEW — abanico + formulario
│   │   └── Contacto.astro                NEW — footer + logo gigante animado
│   ├── styles/
│   │   └── global.css                    NEW — @font-face, CSS vars, reset, utilidades
│   ├── scripts/
│   │   └── animations.js                 NEW — GSAP + Lenis, todos los efectos (bundleado por Vite)
│   └── pages/
│       ├── index.astro                   NEW — ensambla todos los componentes
│       └── 404.astro                     NEW — 404 de marca
├── astro.config.mjs                      NEW
└── package.json                          NEW
```

## Review Focus

1. **Scroll horizontal productos en móvil** — `overflow-x: auto` + `scroll-snap-type: x mandatory` + `scroll-snap-align: center` en cada `.panel`; verificar que no compita con Lenis
2. **Font loading FOUT** — `font-display: swap` en cada `@font-face`; preload links en `<head>` para PaytoneOne y OpenSans-Variable (las dos críticas above-the-fold)
3. **GSAP + Lenis orden de init** — `lenis.on('scroll', ScrollTrigger.update)` debe registrarse antes de cualquier ScrollTrigger; `gsap.ticker.add(t => lenis.raf(t * 1000))` después
4. **Form submit en 404** — la 404 no tiene form; verificar que el handler solo se registra si el elemento existe (`document.getElementById('form-distri')`)
5. **Astro 404 route** — `src/pages/404.astro` se sirve automáticamente en dev y en builds estáticos; confirmar que `output: 'static'` está seteado en `astro.config.mjs`

---

### Task 1: Brand Docs

**Files:**
- Create: `docs/brand.md`
- Create: `docs/notas-boceto.md`

- [ ] Crear `docs/brand.md` con las siguientes secciones y valores exactos extraídos del manual de marca:

  **Paleta:**
  ```
  Principales:
    --tinta:    #141210  (negro web; brand print = #000000)
    --crema:    #faf9ef
    --dorado:   #eaab33  (sabor Clásico)

  Secundarios (uno por sabor):
    --ajo:            #a3c8fc   (azul)
    --picante:        #e1772b   (naranja)
    --chili:          #b1a4f8   (lavanda)
    --pimienta:       #9ed9ab   (verde)
    --dulce-picante:  #d8534f   (rojo)
  ```

  **Tipografías:**
  ```
  PaytoneOne-Regular  → frases de impacto UPPERCASE, titulares web
  Open Sans variable  → body, descripciones, ingredientes, datos
  Rock Salt Regular   → solo decorativo/anotaciones, nunca cuerpo
  ```

  **Personalidad:** Auténtica · Pícara · Cercana · Activa · Desafiante

  **Valores:** Naturalidad · Honestidad · Innovación · Bienestar con sabor · Cercanía

  **Frases de marca (Paytone UPPERCASE):**
  ```
  CARNE POSTA, VERSIÓN SNACK
  CARNE DESHIDRATADA, TU SNACK FAVORITO
  TU PRÓXIMO SNACK FAVORITO
  RICO, SANO Y PROTEICO
  RICO, PRÁCTICO Y REAL
  ABRÍ, PICÁ Y SEGUÍ
  ELEGÍ TU KICHAR
  ```

  **Logos:**
  ```
  logo-dark.png   → KICHAR SNACK negro, para fondos claros
  logo-light.png  → KICHAR SNACK crema, para fondos oscuros
  ```

- [ ] Crear `docs/notas-boceto.md` con el contenido extraído de los bloques `.nota` del boceto (secciones 01–07) y la sección `#materiales` completa (tabla + specs de entrega)

---

### Task 2: Scaffold + Assets

**Files:**
- Create: `package.json`, `astro.config.mjs`
- Create: `public/fonts/` (3 archivos)
- Create: `public/img/` (13 archivos)

**Interfaces:**
- Produces: comandos `npm run dev` y `npm run build` operativos; assets accesibles en `/img/` y `/fonts/`

- [ ] En la raíz del proyecto, ejecutar:
  ```bash
  npm create astro@latest . -- --template minimal --no-install --no-git
  ```
  Elegir: sin TypeScript estricto, sin testing.

- [ ] Instalar dependencias:
  ```bash
  npm install
  npm install gsap lenis
  ```

- [ ] Verificar `astro.config.mjs` contiene `output: 'static'`; si no, agregar:
  ```js
  import { defineConfig } from 'astro/config';
  export default defineConfig({ output: 'static' });
  ```

- [ ] Copiar fuentes a `public/fonts/`:
  - `ENTREGA FINAL/Aplicaciones de marca/Packaging_/Fonts/PAYTONE/PaytoneOne-Regular.ttf` → `public/fonts/PaytoneOne-Regular.ttf`
  - `ENTREGA FINAL/Aplicaciones de marca/Packaging_/Fonts/OPEN SANS/OpenSans-VariableFont_wdth,wght.ttf` → `public/fonts/OpenSans-Variable.ttf`
  - `ENTREGA FINAL/Aplicaciones de marca/Packaging_/Fonts/ROCK SALT/RockSalt-Regular.ttf` → `public/fonts/RockSalt-Regular.ttf`

- [ ] Copiar imágenes a `public/img/`:
  - `ENTREGA FINAL/Logos/PNG/Logo2.png` → `public/img/logo-dark.png`
  - `ENTREGA FINAL/Logos/PNG/Logo1.png` → `public/img/logo-light.png`
  - `ENTREGA FINAL/Aplicaciones de marca/Mockups útiles/Pack1.png` → `public/img/pack-clasico.png`
  - `ENTREGA FINAL/Aplicaciones de marca/Mockups útiles/Pack2.png` → `public/img/pack-ajo.png`
  - `ENTREGA FINAL/Aplicaciones de marca/Mockups útiles/Pack3.png` → `public/img/pack-picante.png`
  - `ENTREGA FINAL/Aplicaciones de marca/Mockups útiles/Pack4.png` → `public/img/pack-hot-chili.png`
  - `ENTREGA FINAL/Aplicaciones de marca/Mockups útiles/Pack5.png` → `public/img/pack-pimienta.png`
  - `ENTREGA FINAL/Aplicaciones de marca/Mockups útiles/Pack6.png` → `public/img/pack-dulce-picante.png`
  - Boceto `img/pila.webp`, `trozo-1.webp`, `trozo-3.webp`, `trozo-4.webp`, `trozo-5.webp` → `public/img/`

- [ ] Verificar `npm run dev` arranca sin errores en localhost:4321

---

### Task 3: Global CSS + Base Layout

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/Base.astro`

**Interfaces:**
- Produces: variables CSS `--crema`, `--tinta`, `--dorado`, `--ajo`, `--picante`, `--chili`, `--pimienta`, `--dulce`, clase `.disp`, clase `.lead`, clase `.pill`, clase `.wrap`

- [ ] Crear `src/styles/global.css` con:
  - `@font-face` para PaytoneOne, OpenSans-Variable, RockSalt — todos con `font-display: swap`
  - Variables CSS en `:root`:
    ```css
    --crema: #faf9ef; --tinta: #141210; --tinta-2: #4a4540;
    --dorado: #eaab33; --ajo: #a3c8fc; --picante: #e1772b;
    --chili: #b1a4f8; --pimienta: #9ed9ab; --dulce: #d8534f;
    --display: "PaytoneOne", "Arial Black", Impact, sans-serif;
    --body: "Open Sans", system-ui, sans-serif;
    --mono: "Rock Salt", monospace;
    ```
  - Reset: `*, *::before, *::after { box-sizing: border-box }`, `body { margin:0; background: var(--crema); color: var(--tinta); font-family: var(--body) }`
  - Utilidades: `.wrap` (padding horizontal con safe-area), `.disp` (PaytoneOne, font-weight 900, uppercase, line-height .86), `.lead` (clamp 1.05–1.3rem, max-width 34ch), `.pill` (badge inline)
  - `@media (prefers-reduced-motion: reduce)` deshabilita animaciones ticker

- [ ] Crear `src/layouts/Base.astro` con:
  - Props: `title: string`, `description?: string`
  - `<head>`: charset, viewport, title, meta description, `color-scheme: light`
  - Preload links para `/fonts/PaytoneOne-Regular.ttf` y `/fonts/OpenSans-Variable.ttf` (`as="font" crossorigin`)
  - `<link rel="stylesheet">` para `../styles/global.css`
  - `<slot />` en `<body>`

- [ ] Verificar en dev: `http://localhost:4321` carga sin FOUT visible, fondo crema, texto tinta

---

### Task 4: Ticker

**Files:**
- Create: `src/components/Ticker.astro`

**Interfaces:**
- Produces: `<Ticker />` — banner promo que se importa en index.astro sobre el Hero

- [ ] Crear `Ticker.astro` con:
  - Estructura: `<div class="ticker">` con dos `.row` duplicados (para loop infinito)
  - Items: `Nuevo: sabor Pimienta Negra`, `Envíos a todo el país`, `Carne posta, versión snack`, `50% proteína`
  - CSS: `background: var(--tinta)`, `color: var(--crema)`, `font-family: var(--display)`, `font-size: 14px`, `animation: tick 22s linear infinite`
  - Separador entre items: `✦` en `--dorado`
  - `@keyframes tick { to { transform: translateX(-100%) } }`

- [ ] Verificar en dev: banner corre sin saltos

---

### Task 5: Hero

**Files:**
- Create: `src/components/Hero.astro`

**Interfaces:**
- Produces: `<Hero />`, section `#inicio`; expone `.hero`, `.pouch`, `.marca`, `.fondo`, `.t1`–`.t4`, `.d-estrella`, `.d-garabato`, `.d-numeral` para GSAP

- [ ] Crear `Hero.astro` con la estructura del boceto, reemplazando:
  - `.marca` div de texto → `<img src="/img/logo-dark.png" alt="Kichar Snack" class="marca capa">` (el logo PNG reemplaza el texto `.disp`)
  - `src="img/pouch-clasico.webp"` → `src="/img/pack-clasico.png"`
  - `src="img/trozo-*.webp"` → `src="/img/trozo-*.webp"`
  - Eliminar toda la `<aside class="nota">` de esta sección
  - Claims laterales `.c1`/`.c2`: "50% proteína" y "Cero azúcar" en Paytone
  - Slogan pill: "CARNE POSTA, VERSIÓN SNACK" (frase de marca oficial)

- [ ] CSS scoped: copiar estilos `.hero`, `.fondo`, `.marca`, `.aro`, `.pouch`, `.claim`, `.capa`, `.t1`–`.t4`, `.d-*` del boceto; ajustar `.marca` para img (no div de texto):
  ```css
  .hero .marca { width: clamp(280px, 45vw, 700px); }
  ```

- [ ] Verificar en dev: hero ocupa 100svh, logo visible, pouch centrado, trozos en posición

---

### Task 6: Conoce

**Files:**
- Create: `src/components/Conoce.astro`

**Interfaces:**
- Produces: `<Conoce />`, section `#conoce`; expone `.conoce .split .w`, `.conoce .dibujar`, `.conoce .pila img` para GSAP

- [ ] Crear `Conoce.astro` con estructura del boceto:
  - Eliminar `<aside class="nota">`
  - Pill: color `--pimienta`, texto "Conocé Kichar"
  - Headline `.split`: "Carne posta, versión snack" (GSAP spliteará en `.w` spans vía JS)
  - Lead copy: "Durante generaciones, la carne deshidratada fue la forma de conservar los alimentos. Recuperamos esa idea y la llevamos al presente: un snack cárnico para una vida activa."
  - Pasos (3): Carne de pastura / Sidra + sal / Secado lento
  - Imagen: `src="/img/pila.webp"` con SVG oval `.dibujar` superpuesto
  - Font Paytone para el headline; Open Sans para lead y pasos

- [ ] Verificar en dev: layout grid 2 columnas desktop, 1 columna mobile

---

### Task 7: Productos

**Files:**
- Create: `src/components/Productos.astro`

**Interfaces:**
- Produces: `<Productos />`, section `#productos`; expone `.pista`, cada `.panel`, `.panel img` para GSAP; `data-color` en cada panel para cambio de fondo

- [ ] Crear `Productos.astro` con 6 `<article class="panel">`:

  | Sabor | data-color | img | Descripción |
  |-------|------------|-----|-------------|
  | Clásico | `#eaab33` | pack-clasico.png | El original: carne, vinagre de sidra y sal. |
  | Ajo | `#a3c8fc` | pack-ajo.png | Sabor intenso a ajo, para los que van de frente. |
  | Picante | `#e1772b` | pack-picante.png | Para arrancar el día con calor. |
  | Hot Chili | `#b1a4f8` | pack-hot-chili.png | El más picante de la línea. |
  | Pimienta Negra | `#9ed9ab` | pack-pimienta.png | Pimienta molida gruesa. Picor seco, aroma fuerte. |
  | Dulce Picante | `#d8534f` | pack-dulce-picante.png | Un toque dulce y un final que pica. |

- [ ] Cada panel: `h3.disp` (PaytoneOne), `<p>` (Open Sans), chips `.chip` (30 g + atributo)
- [ ] Eliminar `<aside class="nota">`
- [ ] CSS: desktop = `.pista { display:flex; width: max-content }`, mobile ≤820px = `overflow-x: auto; scroll-snap-type: x mandatory` + `.panel { scroll-snap-align: center }`

- [ ] Verificar en dev: 6 panels visibles desktop horizontal, snap-scroll en móvil

---

### Task 8: PorQue

**Files:**
- Create: `src/components/PorQue.astro`

**Interfaces:**
- Produces: `<PorQue />`, section `#porque`; expone `.cnt[data-to]`, `.sello`, `.cinta.a .in`, `.cinta.b .in` para GSAP

- [ ] Crear `PorQue.astro` con 4 stats:
  - 50% Proteína, 0g Azúcar, 286 Calorías, GF Gluten Free
  - Cada `.stat` tiene `.sello` (badge circular), `.n > .cnt[data-to=N]`, `<b>`, `<span>`
  - 2 cintas: `.cinta.a` fondo `--dorado` con "Sin azúcar ✦ Gluten free ✦ 50% proteína ✦ Snack natural", `.cinta.b` fondo `--pimienta` con "Carne posta ✦ Versión snack"
  - Eliminar `<aside class="nota">`

- [ ] Verificar en dev: 4 columnas desktop, 2 columnas ≤820px, cintas visibles

---

### Task 9: DiaDia

**Files:**
- Create: `src/components/DiaDia.astro`

**Interfaces:**
- Produces: `<DiaDia />`, section `#dia`; expone `.carta`, `.carta .foto`, `.carta img.mini` para GSAP

- [ ] Crear `DiaDia.astro` con 4 `.carta`:
  - Carta 0 `--dorado`: "Entrenamiento" + pack-clasico.png mini + placeholder foto gym (div con texto italic en Open Sans)
  - Carta 1 `--ajo`: "Trabajo" + pack-ajo.png mini + placeholder escritorio
  - Carta 2 `--pimienta`: "Viajes" + pack-pimienta.png mini + placeholder ruta
  - Carta 3 `--picante`: "Aire libre" + pack-picante.png mini + placeholder trekking
  - Placeholder foto: `<div class="foto-placeholder"><em>Foto por venir</em></div>` styled con rayas diagonales `repeating-linear-gradient`
  - Eliminar `<aside class="nota">`

- [ ] Verificar en dev: cartas con `position: sticky`, apiladas al scroll

---

### Task 10: Distribuidores

**Files:**
- Create: `src/components/Distribuidores.astro`

**Interfaces:**
- Produces: `<Distribuidores />`, section `#distribuidores`; expone `.abanico img` para GSAP; form `#form-distri` con handler JS inline

- [ ] Crear `Distribuidores.astro`:
  - Abanico: 6 imgs de packs en orden inverso (hot-chili → clasico) con `position: absolute`
  - Formulario con campos: nombre/comercio, tipo de negocio (select: Gimnasio / Dietética / Almacén-kiosco / Distribuidor), ciudad
  - Botón: "QUIERO SER PUNTO DE VENTA" (Paytone, fondo `--dorado`)
  - Mensaje de éxito `#ok-msg` oculto, texto: "¡Listo! Te contactamos pronto." styled con `--pimienta`
  - Copy lead: "Gimnasios, almacenes, dietéticas, kioscos y distribuidores. Dejanos tus datos y te enviamos la propuesta comercial."
  - Eliminar `<aside class="nota">`

- [ ] `<script>` inline en el componente (Astro scope):
  ```js
  document.getElementById('form-distri')?.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('ok-msg').textContent = '¡Listo! Te contactamos pronto.';
    document.getElementById('ok-msg').hidden = false;
  });
  ```

- [ ] Verificar en dev: submit muestra mensaje, no recarga página

---

### Task 11: Contacto / Footer

**Files:**
- Create: `src/components/Contacto.astro`

**Interfaces:**
- Produces: `<Contacto />`, `<footer>` `#contacto`; expone `.gigante span` (6 letras K I C H A R) para GSAP; `.logo-footer img` para logo light sobre fondo oscuro

- [ ] Crear `Contacto.astro`:
  - Fondo: `var(--tinta)`, color: `var(--crema)`
  - Logo: `<img src="/img/logo-light.png" alt="Kichar Snack" class="logo-footer">`
  - Redes: spans pill para Instagram, WhatsApp, kicharsnack.com.ar
  - `<div class="gigante disp" aria-label="Kichar">` con 6 `<span>` individuales: K I C H A R
  - Letras `.gigante span`: font-family var(--display), `font-size: clamp(3.4rem, 15vw, 15rem)`
  - Frase bajo el logo: "Carne posta, versión snack." en Open Sans
  - Eliminar `<aside class="nota">`

- [ ] Verificar en dev: fondo oscuro, logo crema visible, letras KICHAR gigantes

---

### Task 12: Pages — index.astro + 404.astro

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/404.astro`

**Interfaces:**
- Consumes: todos los componentes (Tasks 4–11), `Base.astro` (Task 3)
- Produces: ruta `/` + ruta `/404`

- [ ] Crear `src/pages/index.astro`:
  ```astro
  ---
  import Base from '../layouts/Base.astro';
  import Ticker from '../components/Ticker.astro';
  import Hero from '../components/Hero.astro';
  import Conoce from '../components/Conoce.astro';
  import Productos from '../components/Productos.astro';
  import PorQue from '../components/PorQue.astro';
  import DiaDia from '../components/DiaDia.astro';
  import Distribuidores from '../components/Distribuidores.astro';
  import Contacto from '../components/Contacto.astro';
  ---
  <Base title="Kichar Snack — Carne posta, versión snack" description="Snack cárnico deshidratado. Sin azúcar, sin conservantes, 50% proteína.">
    <Ticker />
    <Hero />
    <Conoce />
    <Productos />
    <PorQue />
    <DiaDia />
    <Distribuidores />
    <Contacto />
    <script>import '../scripts/animations.js';</script>
  </Base>
  ```

- [ ] Crear `src/pages/404.astro`:
  - Extiende `Base.astro` con title "404 — Kichar Snack"
  - Fondo: `var(--tinta)`, texto: `var(--crema)`
  - Logo: `<img src="/img/logo-light.png">`
  - Headline Paytone UPPERCASE: "ESTA PÁGINA SE DESHIDRATÓ"
  - Bajada Open Sans (cercana/pícara): "No encontramos lo que buscabas, pero Kichar sí existe. Y está buenísimo."
  - CTA pill dorado: `<a href="/">Volver al inicio</a>`
  - Imagen: `<img src="/img/pack-clasico.png">` decorativa a la derecha
  - Layout centrado, full-viewport height

- [ ] Verificar en dev: navegar a `http://localhost:4321/pagina-que-no-existe` muestra 404 de marca

---

### Task 13: Animations

**Files:**
- Create: `src/scripts/animations.js`

**Interfaces:**
- Consumes: `gsap` y `lenis` desde `node_modules` vía import (bundled por Vite), DOM elements por clase CSS definidos en Tasks 4–11
- Produces: todos los efectos de scroll, mouse y contadores

- [ ] Crear `public/scripts/animations.js` como ES module, portando exactamente el script del boceto con estos cambios:
  - `import gsap from 'gsap'` + `import ScrollTrigger from 'gsap/ScrollTrigger'` + `import Lenis from 'lenis'`
  - `.hero .marca` ahora es `<img>`, no `<div>` — ajustar selector; animación de scale aplica igual
  - Eliminar el bloque de toggle de notas (btn-notas) — ya no existe
  - Mantener el bloque `form-distri` submit solo si el elemento existe (ya manejado en Task 10, pero el check `?.addEventListener` en animations.js también)
  - Efectos a portar (en orden del boceto):
    1. Lenis smooth scroll + ScrollTrigger.update
    2. Hero: pin + parallax multicapa + mouse move (solo desktop)
    3. Conocé: split texto .w por palabras + SVG stroke-dashoffset
    4. Productos: scroll horizontal pin + color background per panel + rotación imgs
    5. PorQué: contadores .cnt + sellos scale + cintas xPercent
    6. Día a día: parallax interno .foto + scale+rotate cartas anteriores
    7. Distribuidores: abanico rotation stagger
    8. Contacto: letras .gigante span yPercent stagger
  - Envolver todo en `(function(){ ... })()` o en `document.addEventListener('DOMContentLoaded', ...)`
  - Guard: `if (!window.gsap || !window.ScrollTrigger) return;` → eliminar (ahora son imports, no globals CDN)
  - `window.addEventListener('load', () => ScrollTrigger.refresh())` al final

- [ ] Verificar en dev con DevTools: sin errores de consola, ScrollTrigger markers visibles temporalmente para confirmar triggers

- [ ] Quitar markers, verificar `npm run build` termina sin errores

---

## Appendix: Flavor Color Map

| Sabor | CSS var | HEX |
|-------|---------|-----|
| Clásico | `--dorado` | `#eaab33` |
| Ajo | `--ajo` | `#a3c8fc` |
| Picante | `--picante` | `#e1772b` |
| Hot Chili | `--chili` | `#b1a4f8` |
| Pimienta Negra | `--pimienta` | `#9ed9ab` |
| Dulce Picante | `--dulce` | `#d8534f` |
