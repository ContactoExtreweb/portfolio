/* Habilidades agrupadas. Los ítems con matices de idioma van localizados. */

type Localized = { es: string; en: string };
type SkillItem = string | Localized;

export type SkillGroup = {
  id: string;
  label: Localized;
  items: SkillItem[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label: { es: 'Frontend', en: 'Frontend' },
    items: [
      'Astro',
      'React',
      'Next.js (App Router)',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'GSAP',
      'Lenis',
      'Framer Motion',
      { es: 'CSS moderno (Grid, Flexbox, tokens, claro/oscuro)', en: 'Modern CSS (Grid, Flexbox, tokens, light/dark)' },
    ],
  },
  {
    id: 'backend',
    label: { es: 'Backend / BaaS', en: 'Backend / BaaS' },
    items: [
      'Supabase (Auth, RLS, Storage)',
      { es: 'PHP (MVC con PDO)', en: 'PHP (MVC with PDO)' },
      { es: 'Funciones serverless (Netlify/Vercel)', en: 'Serverless functions (Netlify/Vercel)' },
    ],
  },
  {
    id: 'integrations',
    label: { es: 'Integraciones', en: 'Integrations' },
    items: ['Stripe', 'Resend', 'OneSignal', { es: 'APIs de IA (Gemini)', en: 'AI APIs (Gemini)' }],
  },
  {
    id: 'infra',
    label: { es: 'Infra y deploy', en: 'Infra & deploy' },
    items: ['Netlify', 'Vercel', 'DNS', { es: 'Docker (nivel básico)', en: 'Docker (basic)' }],
  },
  {
    id: 'seo',
    label: { es: 'SEO técnico', en: 'Technical SEO' },
    items: ['JSON-LD / schema.org', 'Sitemaps', 'robots.txt', { es: 'Rendimiento', en: 'Performance' }],
  },
  {
    id: 'cms',
    label: { es: 'CMS', en: 'CMS' },
    items: ['WordPress + Elementor'],
  },
];
