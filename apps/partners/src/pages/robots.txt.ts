import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ site }) => {
  const configuredSite = (import.meta.env.SITE_URL || site?.toString() || '')
    .replace(/\/$/, '')
  const isProductionSite = configuredSite &&
    !/localhost|127\.0\.0\.1|\.vercel\.app/i.test(configuredSite)
  const lines = ['User-agent: *', 'Allow: /']

  if (isProductionSite) {
    lines.push('', `Sitemap: ${configuredSite}/sitemap-index.xml`)
  }

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
