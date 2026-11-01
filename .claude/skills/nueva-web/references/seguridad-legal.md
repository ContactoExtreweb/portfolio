# Seguridad y legal (España)

1. Principios
2. CSP y cabeceras HTTP
3. Formularios
4. Supabase (si hay datos o panel)
5. Secretos y dependencias
6. Contenido y terceros
7. Legal en España
8. Checklist

## 1. Principios

- Superficie mínima: todo estático salvo lo que de verdad necesite servidor.
- Los secretos nunca llegan al navegador, y la validación que cuenta es la del servidor.
- Ningún tercero que no aporte: cada script externo es riesgo, peso y, a menudo, cookies.

## 2. CSP y cabeceras HTTP

### CSP con Astro (`security.csp`, Astro 6 o superior)

Astro calcula los hashes de los scripts y estilos que procesa y los mete en una `<meta http-equiv="content-security-policy">` al final del `<head>` de cada página. Lo que dice la documentación y lo que se ha comprobado en un build de Astro 7 con Chromium:

- No funciona en `astro dev`: pruébala con `npm run build` + `npm run preview`.
- No es compatible con `<ClientRouter />`: usa las View Transitions nativas (ver `diseno-animacion.md`).
- No calcula el hash de los scripts `is:inline`. El anti-FOUC se ejecuta igualmente porque va antes de la `<meta>`, y una CSP entregada por `<meta>` no afecta a lo que la precede. Si la CSP pasa a una cabecera HTTP, ese script necesita su hash (calculado sobre el contenido exacto del HTML de `dist/`).
- Bloquea los atributos `style="…"` del HTML (y lo que los genere, como `define:vars`). Lo que sí funciona: clases, hojas de estilo y propiedades asignadas desde JS con `el.style.setProperty()` o `el.style.x = …` (así anima GSAP).
- Los bloques `<script type="application/ld+json">` no se ejecutan, así que la CSP no les afecta.
- Al ir en una `<meta>`, no admite `frame-ancestors`: esa va en cabecera.

```js
// astro.config.mjs
export default defineConfig({
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'", // + https://<proyecto>.supabase.co si hay Supabase
        "frame-src 'none'", // o el dominio del embed que se cargue tras un clic
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      // Scripts que Astro no procesa (externos, is:inline tras la meta…):
      // scriptDirective: { hashes: ['sha256-…'] },
    },
  },
})
```

- `'unsafe-inline'` en `script-src`, nunca: si algo lo pide, hash. En `style-src` es tolerable si de verdad hace falta (por ejemplo, un widget que inyecta atributos `style`), pero entonces Astro deja de emitir hashes para esa directiva.
- Cada tercero suma solo lo imprescindible (Turnstile: `challenges.cloudflare.com` en `script-src` y `frame-src`; Supabase en `connect-src`; el embed que se cargue tras un clic, en `frame-src`).
- Si necesitas `<ClientRouter />`, olvida `security.csp`: CSP completa en la cabecera del host, con el hash del anti-FOUC.

### Cabeceras en el host (todas las páginas)

Netlify, en `public/_headers`:

```
/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  X-Frame-Options: DENY
  Content-Security-Policy: frame-ancestors 'none'
  Cross-Origin-Opener-Policy: same-origin
```

Vercel, en `vercel.json`:

```json
{
  "trailingSlash": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Content-Security-Policy", "value": "frame-ancestors 'none'" },
        { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" }
      ]
    }
  ]
}
```

Notas:

- La CSP de la cabecera (solo `frame-ancestors`) y la de la `<meta>` se aplican a la vez; cada una restringe lo suyo.
- `trailingSlash: true` en Vercel encaja con la salida por directorios de Astro (`/servicios/x/`); mantén la misma política en enlaces, canonical y sitemap.
- `includeSubDomains`, solo si todos los subdominios tienen HTTPS. `preload`, solo si el cliente lo tiene claro (salir de la lista tarda meses).
- Con un login OAuth en ventana emergente o pagos en popup, `Cross-Origin-Opener-Policy: same-origin-allow-popups`.
- Mientras ajustas, `Content-Security-Policy-Report-Only` y la consola del navegador.
- Comprueba tras el deploy: `curl -sI https://{dominio} | grep -iE 'strict-transport|content-security|x-content|referrer|permissions|x-frame|cross-origin'` y Mozilla HTTP Observatory (objetivo: A o superior).

## 3. Formularios

- Endpoint en servidor (Astro Action o función serverless). La API key de Resend, nunca en el cliente.
- Valida en servidor con un esquema (zod; las Actions lo traen integrado): tipos, obligatorios, longitudes máximas y formato de email y teléfono. La validación en cliente es solo para la experiencia de uso.
- Antispam por capas: honeypot (campo oculto que un humano no rellena), tiempo mínimo entre la carga y el envío y, si aun así entra spam, Cloudflare Turnstile. Rate limit por IP si hay abuso.
- Email al negocio: destinatario fijo en el servidor, `replyTo` con el email del usuario ya validado, nunca datos del usuario en el `from` ni en cabeceras, y HTML escapado de todo lo que venga del formulario.
- Errores genéricos hacia fuera y el detalle en los logs del servidor, sin datos personales de más.
- Estados claros: enviando, enviado (con lo que va a pasar después) y error con alternativa (teléfono o WhatsApp).
- Información básica de protección de datos junto al botón (responsable, finalidad, derechos y enlace a la política). Si la base legal es el consentimiento (newsletter, comunicaciones comerciales), casilla sin marcar por defecto.
- Si los leads se guardan en Supabase: inserción desde el servidor y tabla con RLS sin políticas para `anon`.

## 4. Supabase (si hay datos o panel)

- RLS activado en todas las tablas, sin excepción, con políticas mínimas: `anon` solo lee lo público; escribir, solo usuarios autenticados con rol de administrador.
- El rol de administrador, en una tabla de roles o en `app_metadata`; nunca en `user_metadata`, que el propio usuario puede modificar.
- La `service_role` key, solo en el servidor. La `anon` key es pública por diseño: su seguridad depende de que RLS esté bien.
- Registro público desactivado si solo entran administradores; URLs de redirección de Auth restringidas al dominio.
- Storage: bucket público solo para imágenes públicas; subida solo para administradores, con límite de tamaño y de tipos MIME.
- Vistas con `security_invoker = true` (si no, se saltan RLS); funciones `security definer` con `search_path` fijado.
- Antes de entregar, revisa el Security Advisor del panel de Supabase.
- Región del proyecto en la UE.

## 5. Secretos y dependencias

- `.env` en `.gitignore` y `.env.example` con los nombres, sin valores. Los valores, en el panel del host.
- Declara las variables con `astro:env` (`envField` con `context: 'server'` y `access: 'secret'` para las claves): el build falla si falta alguna y no se filtran al cliente. Solo las variables con prefijo `PUBLIC_` llegan al navegador.
- `npm audit --omit=dev` antes de entregar; corrige las altas y críticas. Lockfile en el repo y versión de Node fijada (`engines` o `.nvmrc`), la que pida Astro.
- Si una clave se ha subido alguna vez al repo, se rota: borrarla del historial no basta.

## 6. Contenido y terceros

- `set:html` inserta HTML sin escapar: nunca con contenido de usuarios o de la base de datos sin sanear (sanitize-html o DOMPurify en el servidor).
- JSON-LD con datos de la base de datos: escapa `<` como `<` para que nadie pueda cerrar el `<script>`.
- Enlaces externos con `target="_blank"`: `rel="noopener"` (y `noreferrer` si no quieres pasar el referer).
- Vídeos con `youtube-nocookie.com` y fachada; mapas con fachada (ver `seo.md`). Así no se cargan cookies de terceros antes del consentimiento.
- Librerías por npm y empaquetadas, no desde CDN; si no queda otra, con `integrity` (SRI).
- Opcional: `/.well-known/security.txt` con un contacto.

## 7. Legal en España

No es asesoría jurídica: los textos los valida el cliente o su asesor. Lo que sí te toca: que existan, que lleven los datos reales (o `{{TODO}}`) y que estén enlazados desde el footer de todas las páginas.

- **Aviso legal** (LSSI-CE, art. 10): titular, NIF, domicilio, email de contacto, datos registrales si es una sociedad, y colegio profesional y título si es una profesión regulada.
- **Política de privacidad** (RGPD y LOPDGDD): responsable, finalidades, base legal, plazos de conservación, destinatarios y encargados del tratamiento (hosting, Resend, Supabase…; si alguno está fuera del EEE, cómo se cubre la transferencia), derechos y reclamación ante la AEPD.
- **Cookies**: con solo cookies técnicas, basta con informar. Con analítica que usa cookies, mapas o vídeos embebidos, píxeles…: banner según la guía de la AEPD (rechazar tan fácil como aceptar, nada premarcado, nada se carga antes de aceptar) y política de cookies. Lo mejor es diseñar para no necesitarlo: analítica sin cookies y fachadas.
- **Precios** para consumidores, siempre con IVA incluido.
- **Venta online**: condiciones de contratación, desistimiento, envíos y devoluciones. Es otro nivel: que lo valide su asesor.
- **Accesibilidad**: apunta a WCAG 2.2 AA. La normativa europea de accesibilidad obliga desde junio de 2025 a ciertos servicios, como el comercio electrónico (las microempresas que prestan servicios están exentas). Aunque no obligue, es calidad y también suma en SEO.
- **Requisitos de cada sector** (registro turístico, registro sanitario, calificación energética, alérgenos…): ver `sectores.md`.

## 8. Checklist

- [ ] CSP activa (meta de Astro o cabecera), sin `'unsafe-inline'` en scripts y probada con `build` + `preview` (consola sin violaciones)
- [ ] HSTS, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options o `frame-ancestors` y COOP
- [ ] Formulario: validación en servidor, honeypot, HTML escapado, errores genéricos y aviso de privacidad
- [ ] Ningún secreto en `dist/` ni en el repo; variables declaradas con `astro:env`
- [ ] Supabase (si hay): RLS en todas las tablas, roles fuera de `user_metadata` y Security Advisor limpio
- [ ] `npm audit --omit=dev` sin vulnerabilidades altas ni críticas
- [ ] Ningún `set:html` con contenido sin sanear
- [ ] Aviso legal, privacidad y cookies (si aplica) enlazados desde el footer
