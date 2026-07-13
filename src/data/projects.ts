/* Datos de proyectos. Solo hechos confirmados por Saúl — no inventar. */

type Localized = { es: string; en: string };

export type FeaturedProject = {
  id: string;
  name: string;
  url: string;
  role: Localized;
  status: Localized;
  stack: string[];
  context: Localized;
  highlights: { es: string[]; en: string[] };
};

export const featured: FeaturedProject[] = [
  {
    id: 'guadicar',
    name: 'GuadiCar Multimarcas',
    url: 'https://guadicar.es',
    role: { es: 'Proyecto de cliente', en: 'Client project' },
    status: { es: 'En producción', en: 'In production' },
    stack: ['Astro 5', 'Supabase', 'Netlify', 'Resend'],
    context: {
      es: 'Web de un concesionario de vehículos de ocasión en Villanueva de la Serena: catálogo público y panel de administración a medida.',
      en: 'Website for a used-car dealership in Villanueva de la Serena (Spain): public catalogue and a custom admin panel.',
    },
    highlights: {
      es: [
        'Panel de administración con dashboard (Chart.js) y sugerencias de textos con IA',
        'Pipeline de optimización de imágenes con soporte HEIC/iPhone',
        'SEO técnico con schema.org: AutoDealer, Car y BreadcrumbList',
        'Emails transaccionales de leads con Resend',
      ],
      en: [
        'Admin panel with dashboard (Chart.js) and AI-assisted copy suggestions',
        'Image optimization pipeline with HEIC/iPhone support',
        'Technical SEO with schema.org: AutoDealer, Car and BreadcrumbList',
        'Transactional lead emails with Resend',
      ],
    },
  },
  {
    id: 'carmeet',
    name: 'CarMeet ESP',
    url: 'https://carmeet.es',
    role: { es: 'Proyecto propio (TFG)', en: 'Personal project (final degree project)' },
    status: { es: 'En producción', en: 'In production' },
    stack: ['React 19', 'Vite', 'Supabase', 'OneSignal', 'PrimeReact', 'Leaflet', 'Framer Motion'],
    context: {
      es: 'Red social para la comunidad del motor en España. Nació como mi proyecto de fin de grado y sigo desarrollándola.',
      en: 'Social network for the motor community in Spain. It started as my final degree project and I keep developing it.',
    },
    highlights: {
      es: [
        'Eventos con mapa interactivo (Leaflet)',
        'Crews: grupos para la comunidad',
        'Notificaciones push con OneSignal',
        'Seguridad con RLS en Supabase',
      ],
      en: [
        'Events with an interactive map (Leaflet)',
        'Crews: community groups',
        'Push notifications with OneSignal',
        'Security with RLS in Supabase',
      ],
    },
  },
  {
    id: 'extreweb',
    name: 'Extreweb',
    url: 'https://extreweb.es',
    role: { es: 'Agencia propia — diseño y desarrollo íntegros', en: 'Own agency — full design and development' },
    status: { es: 'En producción', en: 'In production' },
    stack: ['Astro', 'GSAP', 'Lenis', 'React', 'Supabase'],
    context: {
      es: 'La web de nuestra agencia de diseño y desarrollo web, hecha de cero: del design system al deploy.',
      en: 'The website of our web design and development agency, built from scratch: from the design system to deployment.',
    },
    highlights: {
      es: [
        'Animaciones de scroll estilo Apple con GSAP + Lenis',
        'Design system propio: tokens CSS y modo claro/oscuro',
        'Panel interno de gestión (React island + Supabase): clientes, proyectos, presupuestos y calendario',
        'SEO completo: schema.org, sitemap y robots.txt',
      ],
      en: [
        'Apple-style scroll animations with GSAP + Lenis',
        'Own design system: CSS tokens and light/dark mode',
        'Internal management panel (React island + Supabase): clients, projects, quotes and calendar',
        'Full SEO: schema.org, sitemap and robots.txt',
      ],
    },
  },
];

export const product = {
  id: 'fisica-elite',
  name: 'Física Élite',
  url: 'https://fisicaelite.vercel.app',
  stack: ['Next.js 15', 'TypeScript', 'Supabase', 'Stripe', 'Bunny Stream', 'Vercel'],
  context: {
    es: 'Plataforma de pago para preparar las pruebas físicas de oposiciones a cuerpos policiales y militares.',
    en: 'Paid platform to train for the physical tests of police and military public exams in Spain.',
  },
};

export const secondary = [
  { name: 'toldospallares.com', url: 'https://toldospallares.com' },
  { name: 'fichar365.com', url: 'https://fichar365.com' },
];
