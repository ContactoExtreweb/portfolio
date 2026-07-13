# CLAUDE.md — Portfolio personal de Saúl Correyero

Contexto del proyecto para Claude Code. Léelo entero antes de empezar cualquier tarea.

## Qué es este proyecto

Portfolio web personal de Saúl Correyero Pañero, desarrollador web junior y cofundador de Extreweb. Objetivos, por orden:

1. Mostrar proyectos reales en producción con detalle técnico.
2. Servir de carta de presentación para candidaturas junior y para captar clientes.
3. Reflejar su personalidad: cercano, directo, con el mundo del motor como hilo conductor sutil.

## Sobre Saúl

- Desarrollador web junior de Miajadas (Cáceres, Extremadura). Quiere desarrollar su carrera desde la región.
- Cofundador de **Extreweb** (extreweb.es), agencia de diseño y desarrollo web, junto a Pedro Fernández Sánchez (Pedro lleva gestión, sistemas y redes; Saúl lleva el desarrollo).
- Técnico Superior en **Desarrollo de Aplicaciones Web (DAW)**, I.E.S. Ágora (Cáceres), titulado en junio de 2026.
- FCT (prácticas) en Novis S.L., enero–marzo 2026.
- Apasionado de los coches y el motorsport; varios de sus proyectos giran en torno a ese mundo.

## Proyectos (contenido principal del portfolio)

### GuadiCar Multimarcas — guadicar.es
Concesionario de vehículos de ocasión en Villanueva de la Serena. Proyecto real de cliente, en producción.
- Stack: Astro 5 + Supabase + Netlify + Resend.
- Destacable: panel de administración a medida (dashboard con Chart.js, sugerencias de textos con IA), pipeline de optimización de imágenes con soporte HEIC/iPhone, SEO técnico con schema.org (AutoDealer, Car, BreadcrumbList), emails transaccionales de leads.

### CarMeet ESP — carmeet.es
Red social para la comunidad del motor en España. Fue su proyecto de fin de grado y sigue desarrollándolo.
- Stack: React 19 + Vite + Supabase + OneSignal + PrimeReact + Leaflet + Framer Motion.
- Destacable: eventos con mapa, crews/grupos, notificaciones push, seguridad con RLS en Supabase.

### Extreweb — extreweb.es
Web de su propia agencia, diseño y desarrollo íntegros.
- Stack: Astro + GSAP + Lenis, design system propio con tokens CSS, modo claro/oscuro, tipografía Inter.
- Destacable: animaciones de scroll estilo Apple, SEO completo (schema.org, sitemap, robots.txt), panel interno de gestión (React island + Supabase) con clientes, proyectos, presupuestos y calendario.

### Física Élite — fisicaelite.vercel.app
Plataforma de pago (producto propio, en desarrollo activo) para preparar las pruebas físicas de oposiciones a cuerpos policiales y militares.
- Stack: Next.js 15 App Router + TypeScript + Supabase + Stripe + Bunny Stream, deploy en Vercel.

### Otros
- **toldospallares.com** — web de cliente con WordPress + Elementor.
- **fichar365.com** — proyecto en producción. (COMPLETAR: pedir a Saúl descripción y stack.)
- **Web de taller de tuning** (en desarrollo, aún sin dominio final): simulador de reprogramación por fases, sistema de citas, panel admin. Astro + islas React + Supabase.

Antes de maquetar la sección de proyectos, confirmar con Saúl cuáles entran y cuáles no (los que están en desarrollo quizá no).

## Habilidades técnicas

- **Frontend:** Astro, React, Next.js (App Router), TypeScript, JavaScript, Tailwind CSS, GSAP, Lenis, Framer Motion, CSS moderno (Grid, Flexbox, tokens, light/dark).
- **Backend / BaaS:** Supabase (Auth, RLS, Storage), PHP (MVC con PDO), funciones serverless (Netlify/Vercel).
- **Integraciones:** Stripe, Resend, OneSignal, APIs de IA (Gemini).
- **Infra y deploy:** Netlify, Vercel, DNS, Docker (nivel básico).
- **SEO técnico:** JSON-LD / schema.org, sitemaps, robots.txt, rendimiento.
- **CMS:** WordPress + Elementor.

## Stack de ESTE proyecto (confirmado por Saúl, julio 2026)

- **Astro** confirmado.
- GSAP + Lenis para animación si el diseño lo pide.
- Sin backend salvo que se añada formulario de contacto (en ese caso: Resend vía función serverless, patrón que ya domina).
- Deploy en **Vercel**. Dominio: **sauldev.es** (julio 2026).

## Decisiones ya tomadas (julio 2026, no volver a preguntar)

- **Estructura de secciones:** Hero → Sobre mí → Proyectos → Stack/habilidades → Extreweb (mención breve) → Contacto.
- **Concepto visual:** "línea de trazado" tipo circuito como hilo conductor — indicador sutil de progreso de scroll que conecta secciones. Guiño al motor vía interacción, no iconografía. Complementos: fichas de proyecto estilo ficha técnica y datos tipo telemetría (números grandes, mono) si encajan.
- **Proyectos que entran, por niveles:**
  - Destacados con mini caso de estudio (contexto, stack, qué hizo y qué tiene de especial): GuadiCar, CarMeet ESP, Extreweb.
  - Física Élite: como "producto propio en desarrollo", SIN caso de estudio.
  - Secundarios solo con enlace: toldospallares.com y fichar365.com.
  - Los proyectos en curso (taller de tuning) quedan fuera.
- **Contenido:** si falta un dato real de un proyecto (descripción, stack, enlaces), preguntar a Saúl. NO inventar nada: ni métricas, ni testimonios, ni textos de relleno.
- **Idioma:** español + inglés (i18n desde el principio, español por defecto).
- **Foto personal:** sí (pendiente que Saúl la pase).

## Plan de trabajo acordado

1. Base: Astro + TypeScript, estructura de carpetas, tokens CSS con modo claro/oscuro (anti-FOUC inline), tipografía, layout global con header y footer vacíos. Dependencias al mínimo: GSAP/Lenis solo cuando una sección lo justifique.
2. Validada la base, sección a sección en el orden de la estructura. Antes de cada sección: explicar en 2-3 líneas qué se va a hacer y esperar OK de Saúl.
- Mobile first real (prueba en Safari iOS), escalar después a desktop.
- Un commit pequeño y con mensaje claro por cada sección.

## Preferencias de diseño conocidas

- Huye de gimmicks: en extreweb.es descartó varios heros recargados. Prefiere conceptos limpios y muy bien ejecutados antes que efectos llamativos.
- Le gustan los reveals con scroll estilo Apple y las microinteracciones sutiles.
- Trabaja con design systems: tokens CSS, modo claro/oscuro bien resuelto (con script anti-FOUC inline).
- Este portfolio es PERSONAL: debe tener identidad propia, no ser un clon de extreweb.es. Un guiño al mundo del motor puede darle carácter, sin caer en el cliché.

## Cómo trabajar con Saúl

- Responde **siempre en español**, tono cercano y directo, sin parrafadas.
- Avanza **paso a paso**: propón → valida con él → implementa. No generes diez archivos de golpe sin consultar.
- Es junior pero con criterio y proyectos reales en producción: explica las decisiones importantes, no le des todo masticado ni le trates de novato.
- Mobile first de verdad: Saúl testea en iPhone (Safari iOS). Ojo con viewport units, safe areas y comportamiento táctil.

## Lecciones aprendidas en sus proyectos Astro (aplícalas aquí)

- Los estilos scoped de Astro NO alcanzan el DOM inyectado por JavaScript → usar `is:global` o clases globales para ese contenido.
- Si TypeScript da guerra en `<script>` de páginas, `// @ts-nocheck` al inicio es aceptable en scripts de página.
- Centralizar datos de contacto/enlaces en un único archivo de configuración (patrón `site.js` que usa en extreweb).

## Pendiente de decidir con Saúl (preguntar antes de asumir)

- (Nada por ahora.)
