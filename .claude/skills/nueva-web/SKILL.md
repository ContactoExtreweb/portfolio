---
name: nueva-web
description: Crea de principio a fin una web pública nueva para un negocio o cliente. Hace el briefing con preguntas interactivas (nombre, tipo de web, sector, fotos, colores de marca, objetivo), investiga el SEO del sector y de la zona, propone arquitectura, keywords y concepto visual, y la construye en Astro con animaciones, transiciones, seguridad y SEO local y sectorial.
argument-hint: "[nombre del negocio]"
disable-model-invocation: true
---

# /nueva-web — web pública nueva, de cero a lista para producción

Lo que el usuario escribió tras el comando (puede venir vacío): $ARGUMENTS

## Qué tienes que conseguir

Una web pública que:

1. **Consiga clientes**: cada página empuja a una acción clara (llamar, WhatsApp, pedir presupuesto, reservar).
2. **Posicione por todo el sector, no solo por la marca**: por el nombre del negocio, por cada servicio + su zona ("taller mecánico Miajadas"), por las variantes y sinónimos con que busca la gente y por las dudas relacionadas del sector. También en las respuestas de los buscadores con IA.
3. **Se vea premium y propia**: un concepto visual que salga del negocio, animaciones y transiciones cuidadas, nada de plantilla genérica.
4. **Sea segura y cumpla la normativa española**: cabeceras estrictas, formularios blindados, RGPD y LSSI.
5. **Vuele en móvil**: mobile first de verdad, Safari iOS incluido, Core Web Vitals en verde.

Nadie puede garantizar el puesto 1 en Google: también cuentan la ficha de Google Business Profile, las reseñas, los enlaces y la competencia. Tu trabajo es que la web no deje nada sobre la mesa (técnica, contenido y SEO local) y entregar el plan para lo que queda fuera de ella. Si sale el tema, díselo así al usuario.

## Reglas que no se negocian

- **No inventes datos**: ni reseñas, ni testimonios, ni cifras ("+500 clientes"), ni años de experiencia, ni premios, ni precios, ni direcciones, ni NIF. Si falta un dato, pídelo; si hay que avanzar sin él, deja un marcador visible `{{TODO: qué falta}}` y apúntalo en la lista de pendientes. Además de engañar al cliente, los datos falsos hunden el SEO: un `aggregateRating` inventado puede acabar en una acción manual de Google.
- **Propón → valida → implementa.** No construyas nada hasta que el usuario apruebe el brief (fase 3). En modo "paso a paso", antes de cada página o sección explica en 2-3 líneas qué vas a hacer y espera el OK.
- **Español, tono cercano y directo, sin parrafadas.** Explica las decisiones importantes en una línea, con su porqué. El usuario es desarrollador: no le des todo masticado.
- **Mobile first real**: diseña y prueba primero a 375 px; ojo con las unidades de viewport, las safe areas y el comportamiento táctil.
- **Calidad antes que efectos**: un concepto limpio y muy bien ejecutado vale más que diez animaciones. Si un efecto no aporta, fuera.
- **Dependencias al mínimo**: cada librería tiene que justificar su peso.
- **Commits pequeños**, uno por bloque (base, cada página o sección, SEO, seguridad, QA), con el formato `Área: resumen corto` y, si hace falta, viñetas con el detalle.
- Si el proyecto ya tiene un `CLAUDE.md`, sus reglas mandan sobre esta skill.

## Mapa de referencias

Las rutas son relativas al directorio de esta skill (se indica al cargarla). Lee cada archivo cuando toque, no todos de golpe.

| Archivo | Cuándo |
|---|---|
| `references/seo.md` | Fase 2 (investigación, keyword map, arquitectura) y fase 6 (SEO técnico) |
| `references/sectores.md` | Fase 2: solo el bloque del sector del negocio |
| `references/diseno-animacion.md` | Fase 3 (concepto visual) y fases 4-5 (tokens, tipografía, animaciones, iOS, imágenes) |
| `references/seguridad-legal.md` | Fase 4 (CSP, cabeceras, variables) y fase 5 (formularios, páginas legales) |
| `references/qa-entrega.md` | Fases 7 y 8 |
| `scripts/seo-audit.mjs` | Fase 7: `node <directorio-de-la-skill>/scripts/seo-audit.mjs dist --site https://dominio` |

---

## Fase 0 — Situarte (sin preguntar nada)

- Mira el directorio actual: ¿vacío, proyecto Astro existente u otra cosa? Si hay `package.json` o `CLAUDE.md`, léelos. Si hay un proyecto que no es Astro, pregunta antes de tocar nada.
- Comprueba qué herramientas tienes: `AskUserQuestion` (preguntas con opciones), `WebSearch` y `WebFetch` (investigación), Playwright o Chromium (capturas y Lighthouse). Si falta alguna, adapta el flujo y dilo en una línea.

## Fase 1 — Briefing interactivo

Objetivo: reunir lo mínimo para investigar y proponer, sin agobiar. Como mucho tres interacciones antes del brief. No repreguntes lo que ya venga en los argumentos o en mensajes anteriores.

### 1.1 Datos básicos (texto libre)

Si no los tienes, pídelos en un único mensaje corto:

> Para arrancar, cuéntame (lo que no sepas, sáltalo):
> 1. **Nombre** del negocio tal cual debe aparecer y **dominio**, si ya lo tiene.
> 2. **A qué se dedica** y sus **servicios o productos principales** (cuanto más concreto, mejor SEO).
> 3. **Dónde está** y **a qué zona** da servicio.
> 4. **¿Tiene web ahora?** Pásame la URL: aprovecho su contenido real y no perdemos lo que ya posiciona.

### 1.2 Tipo, fotos, marca y objetivo (`AskUserQuestion`: una llamada, 4 preguntas)

- **Tipo web** · "¿Qué tipo de web necesita {nombre}?"
  - *Corporativa multipágina (Recomendado)*: home, una página por servicio y contacto. La mejor base para el SEO sectorial.
  - *Landing de una página*: rápida y enfocada a conversión, pero con mucho menos alcance SEO.
  - *Catálogo gestionable*: productos, vehículos, inmuebles… con panel para que el cliente lo actualice.
  - *Reservas o citas*: web más sistema de reservas o citas online.
- **Fotos** · "¿Qué material fotográfico tiene?"
  - *Fotos profesionales*: sesión hecha, con buena calidad.
  - *Fotos de móvil*: las optimizo (HEIC, orientación, peso) y elijo las mejores.
  - *Pocas o ninguna*: diseño que no dependa de fotos, y te digo qué fotos conviene hacer.
- **Marca** · "¿Cómo está su identidad de marca?"
  - *Logo y colores definidos*: los respeto y derivo de ellos la paleta completa.
  - *Solo logo*: saco los colores del logo y propongo la paleta.
  - *Nada definido*: propongo paleta y tipografía según el sector y el concepto.
- **Objetivo** · "¿Qué es lo más importante que haga el visitante?"
  - *Llamar o WhatsApp*: típico de negocio local; contacto siempre a un toque.
  - *Pedir presupuesto*: formulario que llega por email al negocio.
  - *Reservar o pedir cita*: calendario o sistema de reservas.
  - *Comprar online*: venta online (se plantea aparte; ver el stack en la fase 4).

### 1.3 Alcance, idiomas, extras y modo de trabajo (`AskUserQuestion`: una llamada, 4 preguntas)

- **Alcance** · "¿Hasta dónde quiere posicionar?"
  - *Su localidad*: SEO local de la localidad y alrededores inmediatos.
  - *Comarca o provincia*: varias localidades; hace falta estrategia de zonas.
  - *Toda España*: SEO nacional, con más contenido y más competencia.
  - *Internacional*: varios idiomas o países.
- **Idiomas** · "¿En qué idiomas?"
  - *Solo español (Recomendado)*: lo normal si el público es local.
  - *Español + inglés*: i18n con hreflang desde el principio.
  - *Español + portugués*: útil en turismo o comercio con Portugal.
- **Extras** (multiSelect) · "¿Qué necesita además de las páginas?"
  - *Formulario de contacto*: función serverless + Resend, con antispam.
  - *Blog o guías*: contenido para captar las búsquedas relacionadas del sector.
  - *Panel de administración*: Supabase + isla React para que el cliente edite contenido.
  - *Galería de trabajos*: proyectos reales; clave en reformas, bodas, talleres…
- **Modo** · "¿Cómo quieres que trabaje?"
  - *Paso a paso (Recomendado)*: te enseño cada página o sección antes de hacerla.
  - *Del tirón*: validas el brief y construyo todo, con un commit por sección.

Si `AskUserQuestion` no está disponible, haz las mismas preguntas en texto, numeradas y con las opciones a la vista.

## Fase 2 — Investigación SEO del sector y la zona

Lee `references/seo.md` (secciones 1 a 3) y el bloque del sector en `references/sectores.md`. Después:

1. **Web actual** (si la hay): con `WebFetch`, saca el contenido real (servicios, textos, datos de contacto), los títulos y H1 actuales y el listado de URLs (`/sitemap.xml`, `/sitemap_index.xml`). Ese listado es la base de las redirecciones 301: sin ellas, el negocio pierde lo que ya posiciona.
2. **Marca**: busca el nombre del negocio. ¿Tiene ficha de Google, perfiles en directorios, menciones? Anota las incoherencias de nombre, dirección o teléfono (NAP).
3. **Resultados del sector**: con `WebSearch`, lanza 6-10 búsquedas reales: servicio principal + localidad, servicio principal + comarca o provincia, servicios secundarios + localidad, modificadores ("precio", "urgente", "cerca de {ciudad}") y 2-3 dudas típicas del sector. Anota quién sale (competidores, directorios, agregadores), qué tipo de página posiciona y qué preguntas se repiten.
4. **Competencia**: abre con `WebFetch` las 2-3 webs de competidores directos mejor posicionadas: estructura, servicios, títulos, contenido y schema. Busca huecos: servicios sin página propia, dudas sin responder, zonas sin cubrir, webs lentas o sin el contacto a mano.
5. **Keyword map**: agrupa por intención y asigna **una intención principal por URL**, sin canibalizar. Formato en `references/seo.md`.

`WebSearch` no ve lo que ve un usuario de la zona (ni geolocalización ni pack local): úsalo para descubrir competidores, contenidos y dudas, no como ranking real. Sin `WebSearch`, trabaja con tu conocimiento del sector y márcalo como hipótesis que hay que validar con Search Console tras el lanzamiento.

## Fase 3 — Brief y concepto visual (punto de control)

Presenta un brief escaneable, sin relleno:

```
## Brief — {Nombre}
Negocio: … · Zona: … · Objetivo principal: …
Stack: … (por qué, en una línea)

### Arquitectura (URLs)
/ · /servicios/… · /contacto/ · …

### Keyword map
| URL | Keyword principal | Relacionadas y variantes | Intención |

### Lo que he visto en la competencia
- 3-5 hallazgos, cada uno con la oportunidad que abre

### Estructura de la home
1. Hero … 2. …

### Datos que necesito para construir (no invento nada)
- [ ] Dirección completa · teléfono · WhatsApp · email · horario
- [ ] Enlace a la ficha de Google y a las redes sociales
- [ ] Datos legales: razón social, NIF, domicilio
- [ ] Logo (SVG, si existe) y fotos: dónde están
- [ ] Lo que le diferencia, con datos reales (años, marcas, garantías…)
```

Después, una sola llamada a `AskUserQuestion`:

1. **Concepto** · 2-3 propuestas de concepto visual (método en `references/diseno-animacion.md`). Cada opción lleva un `preview` con la idea en una línea, la paleta (hex), las tipografías, cómo es el hero y cuál es la animación de firma.
2. **Deploy** · *Netlify* (cabeceras en `public/_headers`, redirecciones en `public/_redirects`) o *Vercel* (cabeceras y redirecciones en `vercel.json`).
3. **Brief** · "¿Apruebas la arquitectura y el keyword map?": *Sí, adelante* o *Tengo cambios* (los escribe en "Other" o en su siguiente mensaje; no sigas hasta tenerlos).
4. **Crédito** · "¿Crédito de Extreweb en el footer?": *Sí, discreto (Recomendado)*, un "Diseño y desarrollo: Extreweb" con enlace normal y sin keywords; o *No*.

Con el OK, crea el `CLAUDE.md` del proyecto con las decisiones (qué es, datos del negocio, stack y deploy, arquitectura, keyword map resumido, concepto visual y pendientes) y con las reglas de trabajo de esta skill que aplican (idioma, modo de trabajo, mobile first, no inventar datos). Así cualquier sesión futura arranca con todo el contexto. Commit.

## Fase 4 — Base técnica

**Stack por defecto** (web pública = estático primero, por rendimiento y SEO):

| Necesidad | Stack |
|---|---|
| Corporativa, landing, servicios | Astro (última estable) + TypeScript strict + CSS propio con tokens. Sin framework de UI. |
| Formulario | Astro Action (o un endpoint con `export const prerender = false`) con el adapter del host, más Resend. Solo eso va bajo demanda; todo lo demás sigue prerenderizado. |
| Catálogo o contenido editable | Astro + Supabase (Auth, RLS, Storage) + panel de administración como isla React. Fichas prerenderizadas con rebuild por webhook, o bajo demanda si el volumen lo pide. |
| Reservas o citas | Lo mismo, con tabla de citas y emails de confirmación. Si el negocio ya usa una herramienta de reservas, intégrala en vez de rehacerla. |
| Tienda online | Para y plantéalo con el usuario antes de seguir: catálogo pequeño → Astro + Stripe Checkout; tienda seria → Shopify o WooCommerce. Es otro proyecto. |
| App con usuarios y pagos | No es una web pública: Next.js + Supabase + Stripe, con otro planteamiento. |

GSAP y Lenis, solo si el concepto lo pide; React, solo para las islas que lo necesiten.

**Pasos:**

1. Crea el proyecto en modo no interactivo (si no, el CLI se queda esperando respuesta): `npm create astro@latest <carpeta> -- --template minimal --install --no-git --no-ai --skip-houston --yes`. Usa `--git` si la carpeta no es ya un repo; si los flags han cambiado, mira `--help`. Si falla con "Template minimal could not be found" (pasa en entornos cuyo proxy bloquea las descargas de GitHub), monta a mano lo poco que trae la plantilla: `npm init -y`, `npm pkg set type=module` y los scripts `dev`, `build`, `preview` y `check`, `npm install astro`, un `tsconfig.json` que extienda `astro/tsconfigs/strict` (con `include: [".astro/types.d.ts", "**/*"]` y `exclude: ["dist"]`), `astro.config.mjs` y `src/pages/index.astro`. En ambos casos, `npm install -D @astrojs/check typescript`: sin ellos, `astro check` pregunta si instalarlos y, sin terminal interactiva, sale con código 0 sin comprobar nada.
2. `astro.config.mjs`: `site` con el dominio final (sin él, canonical y sitemap salen mal), `@astrojs/sitemap` (`npx astro add sitemap --yes`), i18n si hay varios idiomas (español por defecto, sin prefijo), una política de barra final coherente y `security.csp` (ver `references/seguridad-legal.md`).
3. **Fuente única de datos**: `src/data/site.ts` con el nombre, los datos legales, el NAP, el teléfono en formato internacional, WhatsApp, email, horario, coordenadas, zonas de servicio, redes y enlace a la ficha de Google. Header, footer, contacto, páginas legales y JSON-LD leen de aquí, así el NAP es idéntico en toda la web, que es justo lo que premia el SEO local. Lo que falte, `{{TODO}}`.
4. **Design system** (`references/diseno-animacion.md`): `tokens.css` con primitivos y semánticos, claro/oscuro con `data-theme` y script anti-FOUC inline, tipografía fluida autoalojada y `global.css` con reset y `prefers-reduced-motion`.
5. **Layout base**: componente SEO en el `<head>` (title, description, canonical, hreflang, Open Graph y Twitter, theme-color, JSON-LD), header y footer, skip link y `<main>`.
6. **Seguridad desde el día 1**: cabeceras en el host, `.env` ignorado, `.env.example` con los nombres de las variables y variables declaradas con `astro:env`.
7. `npm run build` limpio y commit.

**Estructura de carpetas:**

```
src/
  data/site.ts          # datos del negocio (fuente única)
  data/services.ts      # o una content collection, si hay muchos servicios
  i18n/                 # diccionarios es/en, si hay varios idiomas
  components/seo/       # SEO.astro (head) y schema.ts (builders de JSON-LD)
  components/layout/    # Header, Footer, MobileCTA, ThemeToggle
  components/sections/  # secciones de cada página
  layouts/Layout.astro
  styles/               # tokens.css y global.css
  pages/                # una ruta por cada URL del keyword map
  assets/               # imágenes optimizables (nunca en public/)
public/                 # favicon, imagen OG por defecto, robots.txt, _headers
```

## Fase 5 — Páginas y secciones

Orden: home → páginas de servicio → sobre nosotros → contacto → legales → 404 → blog o guías, si las hay. En modo paso a paso, antes de cada una: 2-3 líneas con lo que vas a hacer y espera el OK.

**Home de negocio local**: hero (H1 con el servicio principal y la zona, propuesta de valor real, CTA principal y secundario), servicios (cada uno enlaza a su página), por qué elegirles (solo diferenciales reales), cómo trabajan, trabajos o galería, reseñas reales con enlace a la ficha de Google, zona de servicio y cómo llegar, FAQ y CTA final. En móvil, barra fija de contacto (llamar, WhatsApp, cómo llegar) respetando la safe area.

**Página de servicio**: H1 con la keyword principal; un primer párrafo que responda qué es, para quién, dónde y cómo contratarlo; qué incluye; el proceso; precios orientativos solo si el cliente los da; zonas; FAQ de ese servicio; CTA; servicios relacionados (enlazado interno); breadcrumbs y schema `Service`.

**Copy**: claro, concreto, con el vocabulario del sector y de la zona. Nada de frases vacías ("somos líderes", "calidad y profesionalidad", "bienvenidos a nuestra web"): cada afirmación se apoya en un dato real. La keyword va en el title, el H1, el primer párrafo, algún H2, el alt de la imagen principal y la URL, de forma natural, con sinónimos y variantes. El cliente revisa el copy: en el informe final, marca las afirmaciones que tiene que confirmar.

**Animaciones**: reveals sobrios al hacer scroll, microinteracciones en botones, tarjetas y formularios, y transición entre páginas. Reglas y snippets en `references/diseno-animacion.md`. Lo crítico: el contenido se ve sin JavaScript, el elemento LCP no se anima desde opacidad 0 y `prefers-reduced-motion` desactiva todo lo que se mueve.

**Extras, si se pidieron:**

- *Formulario*: endpoint y antispam según `references/seguridad-legal.md` (sección 3), estados de envío cuidados y evento de analítica al enviarse bien. Una página de "gracias" (si la hay) va con `noindex` y fuera del sitemap.
- *Blog o guías*: content collection (Markdown o MDX) con esquema zod: title, description, fechas, keyword principal y servicio relacionado. Cada guía enlaza a su página de servicio y lleva `BlogPosting`.
- *Galería de trabajos*: un trabajo por ficha cuando haya volumen (título con el tipo de trabajo y la localidad, fotos reales y descripción), que es la forma legítima de posicionar en varios pueblos.
- *Panel de administración*: después de las páginas públicas. Supabase Auth solo para administradores, CRUD de lo que el cliente edita, subida de imágenes con optimización, RLS según `references/seguridad-legal.md` (sección 4) y rebuild por webhook si las páginas son estáticas. El panel, con `noindex` y fuera del sitemap.

Un commit por página o sección.

## Fase 6 — Pasada de SEO técnico, rendimiento y seguridad

Recorre las checklists de `references/seo.md` (secciones 4 a 6) y `references/seguridad-legal.md`. Imprescindible: JSON-LD del sector generado desde `site.ts`, sitemap y robots.txt, canonical y hreflang correctos, Open Graph por página, 301 desde las URLs antiguas, cabeceras de seguridad, formulario validado en servidor con antispam y páginas legales enlazadas en el footer.

## Fase 7 — QA y verificación

Sigue `references/qa-entrega.md`: build y `astro check` sin errores (fíate del "0 errors" de la salida, no solo del código de salida), `scripts/seo-audit.mjs` sin errores, capturas a 375, 768 y 1440 px en claro y oscuro (si hay Playwright), Lighthouse en móvil, `prefers-reduced-motion`, navegación con teclado y búsqueda de secretos en `dist/`. Pide al usuario la prueba en su iPhone: la emulación no es Safari. Da resultados reales: si algo no llega al objetivo o no lo has podido medir, dilo.

## Fase 8 — Entrega

Informe con la plantilla de `references/qa-entrega.md`: qué se ha hecho, resultados medidos, keywords por página, pendientes del cliente y plan fuera de la web para los primeros 90 días (ficha de Google, reseñas, NAP en directorios, enlaces locales, contenido y medición).

## Hecho significa

- [ ] Brief aprobado y `CLAUDE.md` del proyecto con las decisiones
- [ ] Todas las URLs del keyword map existen, con title, description y H1 únicos
- [ ] JSON-LD válido del tipo del sector, coherente con `site.ts`
- [ ] Sitemap, robots.txt, canonical, hreflang (si aplica), Open Graph y 404
- [ ] CSP y cabeceras de seguridad; formulario validado en servidor y con antispam
- [ ] Aviso legal, privacidad y cookies (si hay cookies no técnicas)
- [ ] `seo-audit` sin errores; `npm run build` y `astro check` limpios
- [ ] Revisado a 375 px en claro y oscuro; `prefers-reduced-motion` respetado
- [ ] Informe de entrega con resultados reales, pendientes y plan fuera de la web
- [ ] Commits pequeños y descriptivos

## Trampas conocidas (varias ya nos han pasado)

- Los estilos scoped de Astro no alcanzan el DOM inyectado por JavaScript: usa `is:global` o clases globales para ese contenido.
- `<Image>` emite `width` y `height`: sin `img { height: auto }` en el reset, la imagen se estira cuando el CSS cambia el ancho.
- En las fotos de móvil, la orientación viene en el EXIF y se pierde al optimizar: rótalas de verdad antes de meterlas en `src/assets/`.
- Nombres de archivo en minúsculas y sin espacios: el servidor de producción distingue mayúsculas (`foto.JPG` no es `foto.jpg`).
- Las imágenes van en `src/assets/` para que Astro las optimice; en `public/` se sirven tal cual (8 MB en vez de 60 kB) y con su EXIF, GPS incluido.
- Si TypeScript da guerra en un `<script>` de página, `// @ts-nocheck` al principio es aceptable.
- Safari iOS cambia el alto del viewport al mover la barra: no recalcules animaciones por cambios mínimos de altura y usa `svh` o `dvh`, nunca `100vh` a secas.
- `security.csp` de Astro no es compatible con `<ClientRouter />`: usa las transiciones nativas entre documentos (`@view-transition`).
- Astro no calcula el hash de los scripts `is:inline`: el anti-FOUC funciona porque va antes de la `<meta>` CSP, que Astro inyecta al final del `<head>`. Si la CSP pasa a una cabecera HTTP, ese script necesita su hash.
- Con CSP estricta, los atributos `style="…"` del HTML se bloquean: usa clases, o variables CSS asignadas desde JS con `el.style.setProperty()`.
- Olvidar `site` en la config deja canonical y sitemap rotos; olvidar las 301 de la web antigua tira el posicionamiento que ya tenía.
