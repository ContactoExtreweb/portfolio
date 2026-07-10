// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // site: 'https://…', // COMPLETAR: dominio pendiente de decidir
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
