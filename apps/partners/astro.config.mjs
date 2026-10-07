import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    site: process.env.SITE_URL || undefined,
    output: 'server',
    adapter: vercel(),
    integrations: [sitemap(), react()],
    vite: {
        plugins: [tailwindcss()],
    },
})
