# QA y entrega

## 1. Verificación (fase 7)

Ejecuta cada paso y apunta el resultado real. Si un paso no se puede hacer en este entorno (no hay navegador, no hay deploy), dilo en el informe en vez de darlo por bueno.

1. **Build y tipos**: `npm run build` y `npx astro check`, sin errores. `astro check` necesita `@astrojs/check` y `typescript` en devDependencies; si faltan, pregunta si instalarlos y, sin terminal interactiva, sale con código 0 sin comprobar nada. Da por bueno el check solo si la salida dice "0 errors".
2. **Auditoría del build**: `node <directorio-de-la-skill>/scripts/seo-audit.mjs dist --site https://{dominio}` (añade `--json` si quieres la salida en JSON). Revisa por página: un solo H1; title y description presentes, únicos y de longitud razonable; canonical absoluta y coherente; `lang`; Open Graph; imágenes sin `alt` o sin dimensiones; JSON-LD que no parsea; enlaces internos rotos o sin barra final; `{{TODO}}` y lorem ipsum olvidados; `noindex`; scripts inline que la CSP bloquearía. Y a nivel de sitio: robots.txt, sitemap (páginas que faltan, URLs que sobran, `noindex` dentro, dominio incorrecto), titles duplicados y hreflang no recíproco. Los errores se arreglan; los avisos se deciden y se justifican.
3. **Capturas** (si hay Playwright): con `npm run preview`, a 375×812, 768×1024 y 1440×900, en claro y en oscuro (`page.emulateMedia({ colorScheme: 'dark' })`), con el menú móvil abierto y con los estados del formulario. Míralas de verdad: textos cortados, scroll horizontal, contraste, jerarquía, safe areas.
4. **Reduced motion**: `page.emulateMedia({ reducedMotion: 'reduce' })` y comprueba que todo el contenido se ve, sin animar.
5. **Sin JS**: una pasada con JavaScript desactivado (`javaScriptEnabled: false` en el contexto de Playwright): el contenido tiene que verse entero.
6. **Lighthouse en móvil**, sobre `preview`: `npx lighthouse http://localhost:4321/ --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new --no-sandbox" --output=json --output-path=./lighthouse-home.json` (con `CHROME_PATH` apuntando a Chromium si hace falta). Al menos la home, una página de servicio y contacto. Objetivo: 95 o más en las cuatro categorías; si no se llega, explica por qué y qué falta.
7. **Teclado**: tabula por la home y el formulario: foco visible, skip link, menú usable con teclado y con Escape.
8. **Secretos**: ninguna clave en `dist/`. Busca `service_role`, `re_`, `sk_` y los nombres de tus variables secretas.
9. **CSP**: con `build` + `preview`, la consola sin violaciones de CSP en todas las plantillas de página.
10. **Formulario**: envío correcto, validación en servidor (prueba campos vacíos y demasiado largos) y honeypot.
11. **Tras el deploy** (si se hace): cabeceras con `curl -sI`, Mozilla HTTP Observatory, Rich Results Test, PageSpeed Insights sobre la URL real y las 301 de la web antigua, comprobadas una a una.

## 2. Informe de entrega (fase 8)

Usa esta plantilla:

```
# Entrega · {Nombre}

URL: … · Repo: … · Deploy: …

## Qué se ha hecho
- 5-8 líneas: páginas, concepto visual, funcionalidades.

## Resultados medidos
| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| / | … | … | … | … | … | … |

seo-audit: X errores, Y avisos (y por qué se aceptan los que quedan).
No medido: … (y por qué).

## Keywords objetivo por página
| URL | Keyword principal | Secundarias |
|---|---|---|

## Pendiente del cliente (sin esto, la web no está completa)
- [ ] Cada {{TODO}} que queda, con el dato que falta
- [ ] Afirmaciones del copy que tiene que confirmar

## Plan fuera de la web (primeros 90 días)
1. Ficha de Google: …
2. Reseñas: …
3. NAP en directorios: …
4. Enlaces locales: …
5. Contenido: guías sugeridas a partir del keyword map …
6. Medición: Search Console y analítica, revisión mensual …

## Expectativas
Las posiciones dependen también de la ficha de Google, las reseñas, los enlaces
y la competencia. Lo normal es ver movimiento en semanas y resultados
consolidados en meses. La web deja la base técnica y de contenido al máximo.

## Mantenimiento
- Actualizar dependencias, renovar el dominio, revisar el formulario,
  mantener al día horarios y contenidos con fecha.
```
