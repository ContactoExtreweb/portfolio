# Diseño, animación, móvil e imágenes

1. Concepto visual
2. Design tokens y claro/oscuro
3. Tipografía
4. Animaciones: qué herramienta para qué
5. Snippets de reveal, GSAP y Lenis
6. Transiciones entre páginas
7. Microinteracciones
8. Mobile first y Safari iOS
9. Imágenes y fotos
10. Señales de "web genérica" que hay que evitar

## 1. Concepto visual

Cada web necesita una idea central que salga del negocio y esté ejecutada con limpieza, no una plantilla con los colores cambiados. El portfolio del usuario usa una "línea de trazado" de circuito como indicador de scroll: un guiño al motor a través de la interacción, no de la iconografía. Busca ese tipo de idea:

- **De dónde sale**: el oficio (herramientas, materiales, procesos), el lugar (paisaje, arquitectura, luz), el producto (texturas, formas) o la promesa de la marca.
- **Cómo se expresa**: un recurso gráfico propio, una única animación de firma, una forma de presentar los datos y una paleta con intención.
- **Direcciones de ejemplo** (inspiración, no recetas): un taller con fichas de servicio tipo parte de trabajo y medidas en mono; una casa rural cuya paleta y fotografía siguen la luz de la comarca; una empresa de reformas con un comparador antes/después hecho con `clip-path`; una bodega con tipografía editorial y la textura del papel de etiqueta; una inmobiliaria con trazos de plano que se dibujan al hacer scroll.

En el punto de control de la fase 3, cada propuesta lleva: la idea en una línea, por qué encaja con el negocio, la paleta en hex con el contraste calculado, las tipografías, cómo es el hero y la animación de firma. En `AskUserQuestion`, va en el `preview` de cada opción, por ejemplo:

```
Concepto A · "Parte de trabajo"
Por qué: el cliente vende rigor; la web se lee como una orden de taller bien hecha.
Paleta claro:  fondo #F4F2EE · texto #15171A (16:1) · acento #C2410C (4,6:1)
Paleta oscuro: fondo #121417 · texto #ECECEE (15,6:1) · acento #F0703F (6,2:1)
Tipos: Archivo (titulares y texto) + JetBrains Mono (datos y referencias)
Hero: H1 grande a la izquierda, foto real del taller a sangre a la derecha;
      debajo, tres datos reales en mono (años, marcas, garantía).
Firma: las tarjetas de servicio se "rellenan" como un parte al entrar en pantalla.
```

## 2. Design tokens y claro/oscuro

```css
/* src/styles/tokens.css: única fuente de verdad */
:root {
  /* Primitivos: escala derivada del color de marca y neutros */
  --brand-100: …; --brand-500: …; --brand-700: …;
  --neutral-50: …; --neutral-500: …; --neutral-900: …;

  /* Tipografía fluida (mobile → desktop) */
  --font-display: …; --font-sans: …; --font-mono: …;
  --text-sm: clamp(0.875rem, 0.84rem + 0.17vw, 0.9375rem);
  --text-base: clamp(1rem, 0.96rem + 0.2vw, 1.0625rem);
  --text-3xl: clamp(2.25rem, 1.85rem + 2vw, 3.5rem);

  /* Espaciado y layout */
  --space-2: 0.5rem; --space-4: 1rem; --space-8: 2rem; --space-16: 4rem;
  --container-max: 72rem;
  --container-pad: clamp(1.25rem, 4vw, 2.5rem);

  /* Safe areas (iPhone) */
  --safe-top: env(safe-area-inset-top, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);

  /* Movimiento */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 600ms;
}

/* Semánticos: los componentes solo usan estos */
:root,
:root[data-theme='light'] {
  color-scheme: light;
  --color-bg: …;
  --color-bg-elevated: …;
  --color-text: …;
  --color-text-muted: …;
  --color-border: …;
  --color-accent: …;
  --color-accent-contrast: …;
}

:root[data-theme='dark'] {
  color-scheme: dark;
  /* las mismas variables, con valores de oscuro */
}
```

Reglas de color:

- Los componentes solo usan tokens semánticos; los primitivos solo aparecen dentro de los semánticos.
- Contraste WCAG AA: 4,5:1 en texto normal; 3:1 en texto grande y elementos de interfaz. Calcúlalo con un script, no a ojo.
- Si el color de marca no da contraste como texto, úsalo en superficies, botones grandes o detalles, y saca una variante más oscura (más clara en modo oscuro) para texto.
- Modo oscuro de verdad, no invertido: fondos neutros profundos con un punto del tono de marca (nunca `#000` puro), superficies elevadas algo más claras, el acento un poco menos saturado y las imágenes que deslumbren, ligeramente atenuadas.
- `oklch()` y `color-mix()` funcionan en todos los navegadores actuales y facilitan derivar escalas; el hex también vale.

**Script anti-FOUC**, inline en el `<head>`, antes del CSS (el mismo patrón del portfolio, con la clase `js` para las animaciones):

```html
<script is:inline>
  // Anti-FOUC: fija el tema antes del primer paint y marca que hay JS.
  (function () {
    let theme
    try {
      theme = localStorage.getItem('theme')
    } catch {}
    if (theme !== 'light' && theme !== 'dark') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    const root = document.documentElement
    root.dataset.theme = theme
    root.classList.add('js')
  })()
</script>
```

- Botón de tema: cambia `data-theme`, guarda en `localStorage` (con try/catch), lleva `aria-label` y mide 44×44 px.
- Dos `<meta name="theme-color">`, con `media` para claro y para oscuro.
- Con CSP por `<meta>` funciona sin hash porque va antes de ella (ver `seguridad-legal.md`).

## 3. Tipografía

- Como mucho dos familias (titulares y texto), más una mono si el concepto usa datos. Una variable cubre todos los pesos con un solo archivo.
- Autoalojadas, con la Fonts API de Astro o con Fontsource (como el portfolio). La Fonts API: `fonts: [{ provider: fontProviders.fontsource(), name: 'Archivo', cssVariable: '--font-sans' }]` en `astro.config.mjs` (importando `fontProviders` de `astro/config`) y `<Font cssVariable="--font-sans" preload />` (de `astro:assets`) en el `<head>`. Descarga y sirve los archivos desde tu dominio y genera fallbacks ajustados para evitar saltos de layout.
- `preload` solo para la fuente del texto principal o del H1.
- Elige por concepto: no todo es Inter. Un grotesco con carácter, una serif editorial para restauración o bodegas, una mono para datos técnicos.
- Texto base de 16 px como mínimo; los `input`, a 16 px o más (si no, Safari iOS hace zoom al enfocarlos).
- `text-wrap: balance` en titulares y `pretty` en párrafos.

## 4. Animaciones: qué herramienta para qué

| Necesidad | Herramienta |
|---|---|
| Hover, foco, estados, apariciones simples | CSS (`transition`, `@keyframes`) |
| Reveal al entrar en pantalla | `IntersectionObserver` + clases, o animaciones CSS ligadas al scroll (`animation-timeline: view()`) dentro de `@supports` |
| Timelines, scrub, pin, titulares por líneas | GSAP + ScrollTrigger (+ SplitText). Todos los plugins de GSAP vienen gratis en el paquete `gsap` |
| Scroll suave | Lenis, solo si el concepto lo pide; aporta sobre todo en escritorio |
| Transición entre páginas | View Transitions nativas (sección 6) |

Reglas:

- **El contenido se ve sin JS.** El estado inicial oculto solo existe bajo `html.js`, y hay una red de seguridad por si el JS de animación no llega a arrancar.
- **El elemento LCP no se anima desde `opacity: 0`** (el H1 o la imagen del hero): retrasa el LCP. Se pinta visible desde el primer frame; anima solo su `transform` o anima los elementos secundarios.
- **`prefers-reduced-motion: reduce`**: sin parallax, sin scroll suave y sin scrub; el contenido aparece directamente. Pruébalo emulándolo.
- Anima `transform`, `opacity` y `clip-path`; nunca `width`, `height`, `top` o `left`.
- Duraciones cortas (150-600 ms) con easing de salida; en los reveals, desplazamientos pequeños (16-32 px), no vuelos de media pantalla.
- Fuera: scroll-jacking, loaders artificiales, cursores personalizados que estorban, parallax que marea y texto letra a letra por todas partes.
- Carruseles automáticos o vídeos de más de 5 s: con control de pausa (WCAG 2.2.2). Mejor sin carrusel para el contenido importante.
- Si partes titulares con SplitText, comprueba en el árbol de accesibilidad que el titular se sigue leyendo entero.

## 5. Snippets de reveal, GSAP y Lenis

**CSS común** (estado inicial y red de seguridad):

```css
html.js [data-reveal] {
  opacity: 0;
  transform: translateY(24px);
}

/* Si el JS de animación no arranca, todo aparece a los 2,5 s */
html.js:not(.motion-ready) [data-reveal] {
  animation: reveal-failsafe 0s 2.5s forwards;
}

@keyframes reveal-failsafe {
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  html.js [data-reveal] {
    opacity: 1;
    transform: none;
  }
}
```

**Opción A: sin librerías** (suficiente en muchas webs):

```css
html.js [data-reveal] {
  transition:
    opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-out);
}

html.js [data-reveal].is-visible {
  opacity: 1;
  transform: none;
}
```

```js
// @ts-nocheck
document.documentElement.classList.add('motion-ready')

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      io.unobserve(entry.target)
    })
  },
  { rootMargin: '0px 0px -10% 0px' },
)

document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
```

**Opción B: GSAP + ScrollTrigger** (sin `transition` CSS en las propiedades que anima GSAP, o se pelean):

```js
// @ts-nocheck
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
document.documentElement.classList.add('motion-ready')

const mm = gsap.matchMedia()
mm.add('(prefers-reduced-motion: no-preference)', () => {
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })
  })
})
// Con reduced motion no entra: el CSS deja el contenido visible y quieto.
```

- Usa `gsap.to` hacia el estado final: un `gsap.from(el, { autoAlpha: 0 })` sobre un elemento que el CSS ya oculta anima de 0 a 0 y lo deja invisible.
- Para escalonar, `stagger` en GSAP o `:nth-child` en CSS; no `style="--i: 2"`, que la CSP bloquea.
- Varias condiciones a la vez: `mm.add({ desktop: '(min-width: 64rem)', motion: '(prefers-reduced-motion: no-preference)' }, (ctx) => { const { desktop, motion } = ctx.conditions; … })`.
- Si la página cambia de altura (imágenes, fuentes), `ScrollTrigger.refresh()`; con un umbral para no rehacerlo por la barra de Safari (patrón de la línea de trazado del portfolio).

**Lenis** (solo si aporta):

```js
// @ts-nocheck
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ anchors: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
}
```

- Deja `syncTouch` en `false` (el valor por defecto): en táctil manda el scroll nativo, que en iOS es lo correcto.
- Zonas con scroll propio (menú, modales, mapas): `data-lenis-prevent`. Al abrir el menú, `lenis.stop()`; al cerrarlo, `lenis.start()`.
- Limitaciones documentadas: no admite `scroll-snap`, el scroll suave se corta encima de iframes y en Safari va a 60 fps como mucho.

## 6. Transiciones entre páginas

Por defecto, View Transitions nativas entre documentos: CSS puro, sin JS, compatibles con `security.csp` y sin el problema de volver a ejecutar scripts tras cada navegación. Chromium y Safari recientes las soportan; donde no, se navega con normalidad.

```css
@view-transition {
  navigation: auto;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 250ms;
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

- Elementos compartidos entre páginas (la foto de una tarjeta que pasa a ser la de la ficha) con `view-transition-name`, único en cada página. Si el nombre depende de un dato (el id del producto), asígnalo desde una hoja de estilos o desde JS, no con un atributo `style` (CSP).
- `<ClientRouter />` solo si hace falta estado persistente entre páginas (un reproductor, por ejemplo). Implica: sin `security.csp` (CSP en cabecera), scripts dentro de `document.addEventListener('astro:page-load', …)`, limpieza en `astro:before-swap` (`mm.revert()`, `lenis.destroy()`) y el tema reaplicado en `astro:after-swap`.

## 7. Microinteracciones

- Botones: `:hover` solo bajo `@media (hover: hover)`, `:active` con `scale(0.98)` y `:focus-visible` con anillo del color de acento y `outline-offset`.
- Tarjetas: elevación sutil o cambio de borde al pasar el ratón en escritorio; en táctil, respuesta en `:active`.
- Enlaces: subrayado que crece (`text-decoration-thickness` o `background-size`).
- Formularios: foco claro, validación en línea al salir del campo (no mientras se escribe), botón con estado "enviando" y confirmación animada.
- Header: se oculta al bajar y reaparece al subir, con fondo al hacer scroll.
- Números grandes en mono que cuentan al entrar en pantalla (estilo telemetría): solo con cifras reales.

## 8. Mobile first y Safari iOS

- `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`. Nunca bloquees el zoom.
- Diseña a 375 px primero y escala con `min-width`.
- Altos de pantalla: `100svh` para el hero (estable) y `100dvh` para overlays a pantalla completa; nunca `100vh` a secas.
- Safe areas en todo lo fijo: header (`padding-top: calc(… + var(--safe-top))`) y barra inferior de contacto (`padding-bottom: calc(… + var(--safe-bottom))`).
- `background-attachment: fixed` no funciona en iOS: si se quiere ese efecto, con `position: sticky` o capas.
- Áreas táctiles de 44×44 px como mínimo.
- Hover solo bajo `@media (hover: hover) and (pointer: fine)`: en táctil el hover se queda "pegado".
- `input` a 16 px como mínimo y con `type`, `inputmode` y `autocomplete` correctos (`tel`, `email`, `name`, `postal-code`).
- Menú móvil: bloqueo de scroll que funcione en iOS (con Lenis, `lenis.stop()`; sin él, `overflow: hidden` en `html` y `overscroll-behavior: contain` en el menú), cierre con Escape y foco atrapado dentro mientras está abierto.
- Recalcula animaciones solo ante cambios de tamaño significativos: la barra de Safari cambia el alto del viewport constantemente.
- Prueba cada sección en un iPhone real antes de darla por buena: la emulación de Chromium no es Safari.

## 9. Imágenes y fotos

- Siempre en `src/assets/` con `<Image>` o `<Picture>` (`formats={['avif', 'webp']}`, `widths` y `sizes` adecuados). `public/` solo para lo que necesita una URL fija (favicon, imagen OG por defecto).
- Fotos de móvil: convierte el HEIC a JPG antes (los binarios estándar de sharp no leen HEIC: `heic-convert` o `sips` en macOS), rótalas físicamente según el EXIF, redimensiónalas a unos 2000 px de lado mayor y ponles nombres descriptivos en minúsculas.
- El EXIF de las fotos de móvil lleva GPS: las versiones que optimiza Astro salen sin metadatos; los originales que se dejen en `public/`, no.
- `alt` descriptivo y útil; las decorativas, con `alt=""`.
- Recortes con `aspect-ratio`, `object-fit: cover` y un `object-position` pensado (que no corte caras).
- Sin fotos: diseño tipográfico, color, formas, iconos de un solo set (SVG inline, Lucide o Phosphor) e ilustración. Stock solo como ambiente genérico, nunca haciéndolo pasar por el equipo, el local o los trabajos del cliente. Recomienda una sesión de fotos: es lo que más mejora la confianza y la ficha de Google.
- Logo en SVG (optimizado con SVGO). Si solo hay PNG o JPG, pídelo en vectorial; no lo redibujes inventando.
- Imagen OG de 1200×630 hecha con el propio design system.
- Vídeo en el hero: mejor no en móvil. Si va, con `poster`, `muted`, `playsinline` y `preload="none"`, corto y ligero, y con reduced motion se queda en el póster.

## 10. Señales de "web genérica" que hay que evitar

- Hero centrado con degradado violeta-azul y "Bienvenidos a nuestra web".
- Tres tarjetas idénticas con iconos de emoji.
- Glassmorphism, sombras enormes y bordes muy redondeados por todas partes.
- Todo aparece con el mismo fade-up.
- Fotos de stock de apretones de manos y equipos sonrientes que no son el equipo.
- Testimonios sin nombre ni fuente y contadores inventados.
- Textos que valdrían para cualquier negocio de cualquier ciudad.
