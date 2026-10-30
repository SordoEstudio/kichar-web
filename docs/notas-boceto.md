# Kichar Snack — Notas del Boceto de Movimiento

Extraído de `Kichar · Boceto de movimiento/index.html` · Harvi × Chiare Studio

Estas notas estaban superpuestas en el boceto como overlays técnicos (`.nota`). Se documentan aquí para referencia del equipo de desarrollo. El sitio real no las incluye.

---

## 01 · Inicio (Hero)

**Efecto:** Sección pineada + parallax de 5 capas. Fondo y logo lentos, paquete a velocidad media, trozos de carne y garabatos rápidos, girando y pasando por delante del texto.

**Técnica:** GSAP ScrollTrigger (`pin` + `scrub`), Lenis para suavizar. Desenfoque en capas cercanas = profundidad.

**Material:**
- ✅ Tenemos — Pouch recortado
- ❌ Falta — 8–10 trozos de carne **sueltos** y recortados
- ❌ Falta — Garabatos de marca en SVG
- ❌ Falta — Logo KICHAR en SVG

---

## 02 · Conocé Kichar

**Efecto:** El título se revela palabra por palabra con el scroll y el óvalo de la marca se dibuja alrededor de la carne.

**Técnica:** GSAP SplitText + trazo SVG animado (`stroke-dashoffset` / DrawSVG).

**Material:**
- ❌ Falta — Óvalo y flechas como **trazo** SVG (sin expandir)
- ❌ Falta — Fotos de proceso / ingredientes (opcional)

---

## 03 · Productos

**Efecto:** La sección queda fija y los sabores pasan en horizontal. El fondo cambia al color de cada sabor y cada paquete gira al entrar. En celular: carrusel con deslizamiento.

**Técnica:** ScrollTrigger `pin` + `containerAnimation`. Datos desde el panel (hasta 7 productos).

**Material:**
- ✅ Tenemos — 6 pouches de frente (Pack1–6.png, Chiare Studio)
- ❌ Falta — Dorso de cada pouch (giro 3D opcional)
- ❌ Falta — Ingrediente recortado por sabor (ajo, pimienta, chile)
- ✅ Resuelto — HEX oficial de cada sabor (ver `brand.md`)

---

## 04 · Por qué Kichar

**Efecto:** Contadores que suben al entrar, sellos que giran y dos cintas cruzadas que corren en sentidos opuestos según el scroll.

**Técnica:** GSAP tween de números + `xPercent` con `scrub`.

**Material:**
- ❌ Falta — Sellos / stickers de atributos en SVG
- ❌ Falta — Tabla nutricional **validada** (el boceto repite valores de ejemplo)

---

## 05 · Día a día

**Efecto:** Cartas que se apilan: cada escena queda fija y la siguiente se le monta encima. La foto se mueve dentro de su marco (parallax interno).

**Técnica:** CSS `position: sticky` + GSAP para escala, giro y desplazamiento de la imagen.

**Material:**
- ❌ Falta — Sesión de fotos lifestyle: 4–5 escenas, versión vertical y horizontal
- ❌ Falta — Opcional: clips de video cortos (5–8 s) en loop

---

## 06 · Distribuidores

**Efecto:** Los 6 paquetes se abren en abanico al entrar. Es la sección más calma: lo importante es el formulario.

**Técnica:** GSAP `rotation` con `stagger` y `scrub`.

**Material:**
- ✅ Tenemos — Pouches (Pack1–6.png)
- ❌ Falta — Foto de caja master / exhibidor (opcional)

---

## 07 · Contacto

**Efecto:** Cierre con el logo gigante: cada letra sube a distinta velocidad hasta quedar armado.

**Técnica:** Letras separadas + `stagger` con `scrub`.

**Material:**
- ❌ Falta — Logo en SVG con letras como trazados separados (para animación por letra)

> Solución adoptada en el sitio: letras individuales con `font-family: PaytoneOne` como aproximación hasta recibir el SVG.

---

## Tabla de Materiales Pendientes

| Material | Para qué sección | Formato | Prioridad |
|----------|-----------------|---------|-----------|
| Logo KICHAR en SVG | Inicio, Contacto | SVG vectorial, cada letra como trazado separado + versión completa | **Imprescindible** |
| Trozos de carne sueltos | Inicio (primer plano), Productos | 8–10 piezas fotografiadas de a una, PNG transparente ≥ 2000 px, ángulos variados | **Imprescindible** |
| Garabatos de marca (espiral, estrella, numeral, flechas, óvalo) | Todas | SVG con **trazos abiertos** (sin expandir contorno) para dibujarlos en pantalla | **Imprescindible** |
| Tabla nutricional validada | Por qué Kichar, ficha de producto | Texto o planilla con valores reales por sabor | **Imprescindible** |
| Fotos lifestyle | Día a día | 4–5 escenas, cada una en vertical 4:5 y horizontal 16:9, ≥ 2400 px | Deseable |
| Ingrediente por sabor (ajo, pimienta, chile, etc.) | Productos | PNG transparente | Deseable |
| Sellos / stickers de atributos | Por qué Kichar | SVG | Deseable |
| Dorso de los pouches | Productos (giro del paquete) | PNG transparente, mismo encuadre que el frente | Upgrade |
| Clips de video cortos | Día a día, Inicio | MP4 5–8 s, sin audio, loopeable | Upgrade |
| Modelo 3D del pouch | Inicio (paquete girando en 3D) | .glb / .gltf, o archivo de Spline | Upgrade |

---

## Specs de Entrega para Sesión de Fotos

- Fondo liso de color uniforme, que facilite el recorte.
- Misma luz en todas las piezas, desde el mismo lado.
- Trozos fotografiados de a uno, de frente, en 3/4 y de perfil.
- Algunas tomas cenitales del paquete abierto.

## Specs de Entrega para Archivos Vectoriales

- Un archivo por elemento, con nombre claro (`garabato-espiral.svg`).
- Trazos como *stroke*, no como relleno.
- Sin textos convertidos a curvas, salvo el logo.

## Estructura de Carpetas para Entrega

```
logo/
producto/
carne/
garabatos/
fotos/
```

> Optimización a WebP para la web la hace el equipo de desarrollo. Chiare entrega la máxima resolución.
