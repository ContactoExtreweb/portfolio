# SEO: investigación, arquitectura y checklist técnico

1. La pirámide de búsquedas
2. Investigación de keywords sin herramientas de pago
3. Keyword map y arquitectura
4. On-page, página a página
5. Datos estructurados (JSON-LD)
6. SEO técnico, rendimiento y medición
7. SEO local fuera de la web (plan para el cliente)
8. Buscadores con IA
9. Errores que hunden una web

## 1. La pirámide de búsquedas

Posicionar por el nombre del negocio es lo fácil: quien lo busca ya lo conoce. Los clientes nuevos buscan el servicio. Cubre todos los niveles y asigna cada uno a una página:

| Nivel | Ejemplo (taller en Miajadas) | Dónde se trabaja |
|---|---|---|
| Marca | "{marca} miajadas" | Home, ficha de Google, NAP coherente en todas partes |
| Servicio + zona | "taller mecánico miajadas" | Home y página del servicio principal |
| Variantes y sinónimos | "mecánico miajadas", "taller de coches cerca de trujillo" | Páginas de servicio, H2, texto |
| Servicio concreto | "cambio de embrague", "pre ITV", "carga de aire acondicionado" | Una página por servicio con demanda propia |
| Problema o necesidad | "el coche pierde aceite", "testigo del motor encendido" | Guías o FAQ que enlazan al servicio |
| Dudas y comparativas | "cada cuánto cambiar la correa de distribución", "precio cambio de embrague" | Guías o blog (topic cluster) |
| Comerciales | "mejor taller", "taller urgente", "abierto los sábados" | Diferenciales reales y datos visibles (horario, garantías) |

Cubrir el tema entero (servicios, problemas, dudas y contexto local) es lo que construye autoridad temática: Google y los asistentes de IA entienden que esa web es la referencia del sector en esa zona.

## 2. Investigación de keywords sin herramientas de pago

1. **Semillas**: cada servicio o producto del cliente, con su vocabulario Y con el de la calle (el cliente dice "electromecánica"; la gente busca "mecánico").
2. **Modificadores**: localidad, comarca, provincia, "cerca de {ciudad grande}", precio, barato, urgente, 24 horas, abierto hoy o sábado, mejor, opiniones, a domicilio; marcas y modelos con los que trabaja; materiales y tipos.
3. **Resultados reales** (`WebSearch`): mira qué sale para cada búsqueda importante. Si salen fichas de Google y webs de negocios locales, la búsqueda es local y ganable. Si dominan los agregadores (TripAdvisor, Doctoralia, Idealista, coches.net, Booking…), la estrategia es ficha de Google + long tail + presencia en el agregador enlazando a la web, no pelear de frente por la genérica.
4. **Competencia** (`WebFetch`): qué servicios nombran, cómo titulan, qué preguntas responden, qué schema usan. Cada hueco es una oportunidad.
5. **Dudas reales**: las preguntas que se repiten en los resultados, las FAQ de la competencia y, sobre todo, lo que el cliente oye cada día en el mostrador o al teléfono. Pregúntaselo: es oro para las FAQ y las guías.
6. **Validación**: deja anotado en el informe que, a las 4-8 semanas del lanzamiento, hay que mirar Search Console (consultas reales, impresiones, CTR) y ajustar títulos y contenidos.

## 3. Keyword map y arquitectura

Regla: **una intención principal por URL**. Dos páginas peleando por la misma búsqueda se canibalizan y no posiciona ninguna.

Formato del keyword map:

| URL | Keyword principal | Secundarias, variantes y dudas | Intención | Tipo |
|---|---|---|---|---|
| `/` | taller mecánico {localidad} | mecánico {localidad}, taller de coches {comarca} | transaccional local | home |
| `/servicios/pre-itv/` | pre ITV {localidad} | revisión antes de la ITV, qué miran en la ITV | transaccional | servicio |
| `/guias/cada-cuanto-cambiar-el-aceite/` | cada cuánto cambiar el aceite | kilómetros entre cambios, tipos de aceite | informacional | guía que enlaza a `/servicios/cambio-de-aceite/` |

Arquitectura:

- **Home**: marca + servicio principal + zona.
- **Una página por servicio** con demanda propia. Los servicios menores se pueden agrupar en una página con secciones y anclas.
- **Zonas**: si el negocio cubre varias localidades, una página "Zonas de servicio" con las localidades y cómo se atiende cada una, más menciones naturales en las páginas de servicio. Páginas por localidad, solo si cada una tiene contenido propio real (trabajos hechos allí, tiempos de desplazamiento, particularidades). Clonar páginas cambiando el nombre del pueblo es lo que Google trata como spam (doorway pages).
- **Guías o blog**: responden dudas del sector y enlazan a la página de servicio correspondiente (topic cluster). Mejor cinco guías buenas que treinta flojas; si el cliente no va a mantener un blog, haz guías atemporales en lugar de "noticias".
- **Confianza**: sobre nosotros (historia y equipo reales), trabajos o casos, contacto con mapa y horario.
- **URLs**: minúsculas, con guiones, sin tildes ni eñes (`/servicios/reparacion-de-embragues/`), cortas, descriptivas y sin fechas. Una sola política de barra final.
- **Profundidad**: cualquier página a tres clics o menos de la home. Breadcrumbs visibles en las páginas internas.

## 4. On-page, página a página

- **`<title>`** único, de unos 50-60 caracteres: `{Servicio} en {Localidad} | {Marca}`. En la home: `{Marca} · {Servicio principal} en {Localidad}`.
- **Meta description** única, de unos 140-160 caracteres: beneficio concreto + zona + llamada a la acción. Google la reescribe a veces, pero sigue influyendo en el CTR.
- **Un solo H1** con la keyword principal en lenguaje natural. H2 y H3 con las secundarias y con preguntas reales.
- **Primer párrafo que responda**: qué, dónde, para quién y cómo contratar. Es lo que leen Google, los asistentes de IA y el usuario con prisa.
- **Contenido útil y específico**: qué incluye, proceso, plazos, garantías, zonas, FAQ y precios orientativos si el cliente los da. El texto genérico producido en masa entra en las políticas de spam de Google ("scaled content abuse"); escribe para este negocio y esta zona.
- **Enlazado interno** con anclas descriptivas ("reparación de transmisiones automáticas", nunca "pincha aquí"). Cada servicio enlaza a 2-3 relacionados y a contacto.
- **Imágenes**: nombre de archivo descriptivo (`reforma-bano-don-benito.jpg`) y `alt` que describa la imagen con su contexto (no una lista de keywords); las decorativas, con `alt=""`.
- **NAP** en el footer idéntico al de la ficha de Google: mismo nombre, misma dirección en el mismo formato, mismo teléfono.
- **Contacto a un toque**: `tel:+34…`, `https://wa.me/34…` (con texto prellenado si ayuda) y un enlace "Cómo llegar" a Google Maps.
- **Mapa**: nunca el iframe de Google Maps de entrada (pesa, empeora el LCP y pone cookies de terceros). Usa una fachada: imagen estática o tarjeta con enlace, y el iframe solo tras un clic.
- **Fecha de actualización** visible en las guías.

## 5. Datos estructurados (JSON-LD)

Genéralo todo desde `site.ts` con funciones en `src/components/seo/schema.ts`; nada de JSON escrito a mano en cada página. Usa un `@graph` con `@id` estables para enlazar las entidades:

```ts
// src/components/seo/schema.ts (esqueleto)
import { site } from '../../data/site'

export const BUSINESS_ID = `${site.url}/#negocio`
export const WEBSITE_ID = `${site.url}/#web`

export function businessSchema() {
  return {
    '@type': site.schemaType, // el subtipo del sector, p. ej. 'AutoRepair' (ver sectores.md)
    '@id': BUSINESS_ID,
    name: site.name,
    url: `${site.url}/`,
    logo: `${site.url}/logo.png`,
    image: [`${site.url}/og.jpg`],
    telephone: site.phone, // +34…
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: 'ES',
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days, // ['Monday', 'Tuesday', …]
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: site.areaServed.map((name) => ({ '@type': 'City', name })),
    sameAs: [site.social.google, site.social.instagram, site.social.facebook].filter(Boolean),
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${site.url}/`,
    name: site.name,
    inLanguage: 'es-ES',
    publisher: { '@id': BUSINESS_ID },
  }
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}
```

En el layout: `<script type="application/ld+json" set:html={JSON.stringify(graph(...))} />`.

Qué va en cada página:

- **Todas**: `WebSite` y el negocio (con el subtipo del sector). O completos en la home y, en el resto, referenciados por `@id`.
- **Servicio**: `Service` (`name`, `serviceType`, `description`, `provider: { '@id': BUSINESS_ID }`, `areaServed`) y `BreadcrumbList`.
- **Catálogo**: `ItemList` en el listado; en cada ficha, `Product` + `Offer` (o `Car` en vehículos, o el tipo de inmueble en inmobiliarias) con precio y disponibilidad reales.
- **Guía o blog**: `BlogPosting` con `author`, `datePublished`, `dateModified` e `image`.
- **FAQ**: `FAQPage` solo si las preguntas están visibles en la página. Desde 2023, Google apenas muestra el resultado enriquecido de FAQ (lo reserva para webs oficiales y de salud con autoridad), pero el contenido sí ayuda en el long tail y en las respuestas de IA.
- **Eventos**: `Event` con fechas, lugar y precio reales.
- **Contacto y sobre nosotros**: `ContactPage` y `AboutPage` (opcionales).

Reglas:

- **Reseñas**: no marques `aggregateRating` ni `Review` sobre el propio negocio. Google no muestra estrellas "autoatribuidas" en LocalBusiness ni en Organization y, si son inventadas, es spam. Las reseñas reales de Google se pueden mostrar como contenido, enlazando a la ficha.
- `geo`, `openingHoursSpecification` y `priceRange`, solo con datos reales (las coordenadas, de la ficha de Google o del cliente).
- No uses `SearchAction` (Google retiró el cuadro de búsqueda de sitelinks en 2024) ni `HowTo` (sin resultado enriquecido desde 2023).
- El `name` de `WebSite` en la home ayuda a que Google muestre bien el nombre del sitio en los resultados.
- Si el JSON lleva datos de una base de datos, escapa `<` como `<` antes de meterlo con `set:html`, para que nadie pueda cerrar el `<script>`.
- Valida: que el JSON parsee (lo comprueba `seo-audit.mjs`) y, tras el deploy, con Rich Results Test y validator.schema.org.

## 6. SEO técnico, rendimiento y medición

**Indexación**

- `site` en `astro.config.mjs` con el dominio final (https). Canonical absoluta y autorreferente en cada página.
- `@astrojs/sitemap` (con `i18n` si hay varios idiomas). Fuera del sitemap: la 404, las páginas de "gracias" y cualquier página con `noindex`.
- `robots.txt` con `Sitemap: https://{dominio}/sitemap-index.xml`. No bloquees CSS ni JS.
- **Bots de IA**: por defecto, no los bloquees; a un negocio local le interesa aparecer en las respuestas de IA. Si el cliente no quiere que se entrenen modelos con su contenido, bloquea solo los de entrenamiento (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`) y deja los de búsqueda (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`). Las AI Overviews de Google dependen de Googlebot, no de Google-Extended.
- Un solo host canónico (con o sin `www`) y HTTPS: la otra variante redirige con 301 desde el host.
- **Web anterior**: mapa de 301 de cada URL antigua a su equivalente nueva (`public/_redirects` en Netlify, `redirects` en `vercel.json` o en `astro.config`). Las que no tengan equivalente, a la página más cercana; no todas a la home.
- Previews y staging, sin indexar (`X-Robots-Tag: noindex` fuera de producción), y producción sin ningún `noindex` olvidado.
- `<html lang="es">`. Con varios idiomas: hreflang recíproco en todas las páginas (`es`, `en` y `x-default` hacia el español), slugs traducidos y nada de mezclar idiomas en una misma URL.
- `404.astro` útil, con enlaces a los servicios y al contacto.

**Metadatos sociales**

- Open Graph y Twitter card en todas las páginas: `og:title`, `og:description`, `og:image` (1200×630, por página o una por defecto hecha con el design system), `og:url`, `og:locale` (`es_ES`) y `og:type`.
- Favicon SVG, `apple-touch-icon` de 180×180 y `theme-color` para claro y oscuro.
- `<meta name="robots" content="max-image-preview:large">` para que las previsualizaciones salgan con imagen grande.

**Rendimiento** (Core Web Vitals en el percentil 75: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1)

- Estático por defecto; islas solo donde haga falta (`client:visible` o `client:idle` antes que `client:load`).
- La imagen LCP, con `loading="eager"`, `fetchpriority="high"` y un `sizes` correcto; el resto, `lazy` (lo que hace `<Image>` por defecto).
- Fuentes autoalojadas en woff2 (Fonts API de Astro o Fontsource), como mucho dos familias y `preload` solo de la principal.
- JS por página al mínimo: GSAP solo en las páginas que lo usan (Astro empaqueta por página). Nada de librerías para lo que ya hace CSS.
- Terceros (chat, mapas, vídeos, widgets de reseñas) con fachada o cargados tras una interacción.
- Objetivo: Lighthouse en móvil ≥ 95 en las cuatro categorías.

**Medición**

- Search Console con propiedad de dominio (verificación por DNS), sitemap enviado e inspección de la home.
- Bing Webmaster Tools (se importa desde Search Console): Bing también alimenta a buscadores con IA.
- Analítica: mejor sin cookies (Plausible, Umami…), que en la mayoría de casos evita el banner; con GA4, banner de consentimiento según la guía de la AEPD. Eventos clave: clic en teléfono, en WhatsApp y en "cómo llegar", y envío correcto del formulario.
- El enlace a la web desde la ficha de Google, con UTM (`?utm_source=google&utm_medium=organic&utm_campaign=gbp`), para medir lo que aporta la ficha.

## 7. SEO local fuera de la web (plan para el cliente)

La web es la mitad. La otra mitad, la que decide el "pack local" (el mapa con tres negocios), se trabaja fuera:

1. **Ficha de Google Business Profile**: categoría principal exacta (la más específica que exista para la actividad principal), categorías secundarias para el resto, servicios dados de alta, zona de servicio, horario (festivos incluidos), fotos reales nuevas cada cierto tiempo, publicaciones y enlace a la web con UTM.
2. **Reseñas**: pedirlas de forma sistemática (enlace corto o QR al acabar el servicio) y responderlas todas. Nunca comprarlas ni inventarlas: lo prohíben Google y la normativa de consumo.
3. **NAP idéntico** en la web, Google, Apple Business Connect, Bing Places, redes sociales y directorios generales y del sector.
4. **Enlaces y menciones locales**: asociaciones de empresarios, Cámara de Comercio, ayuntamiento, patrocinios, prensa local, proveedores y marcas con localizador de distribuidores, colegios profesionales.
5. **Contenido**: 1-2 guías al mes sobre las dudas del keyword map, si el cliente puede aportar la información.
6. **Revisión mensual** en Search Console: consultas con impresiones pero CTR bajo → mejorar title y description; consultas nuevas → nuevas secciones o guías.

## 8. Buscadores con IA (AI Overviews, ChatGPT, Perplexity, Gemini)

No hay trucos especiales: premian lo mismo que el buen SEO, con más peso en la claridad.

- **Entidad inequívoca**: mismo nombre, NAP y descripción en todas partes; `sameAs` a la ficha de Google y a las redes; un "Sobre nosotros" con datos verificables.
- **Respuestas directas**: primeras líneas de cada página que se puedan citar tal cual (qué, dónde, cuánto, cómo contactar).
- **Estructura**: listas, tablas, FAQ y encabezados que sean preguntas reales.
- **Datos concretos**: horarios, zonas, plazos, marcas, precios orientativos reales.
- **Menciones en terceros**: directorios, prensa local y reseñas pesan mucho para que un asistente recomiende un negocio.
- `llms.txt`: opcional y barato, pero no hay confirmación de que los grandes buscadores lo usen. No lo vendas como mejora de posicionamiento.

## 9. Errores que hunden una web

- Contenido que solo existe tras ejecutar JS, o que queda oculto si falla la animación.
- Texto importante dentro de imágenes.
- Páginas de zona clonadas, keyword stuffing, titles o descriptions duplicados.
- Lanzar sin redirigir las URLs de la web antigua.
- `noindex` o `Disallow: /` heredados del staging.
- Iframes de mapas y vídeos cargados de entrada.
- Schema que no coincide con lo visible (reseñas, precios u horarios inventados).
- Cambiar el NAP en la web sin cambiarlo en la ficha de Google.
