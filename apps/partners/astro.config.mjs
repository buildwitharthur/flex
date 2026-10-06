import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: process.env.SITE_URL || undefined,
  output: 'server',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
})
