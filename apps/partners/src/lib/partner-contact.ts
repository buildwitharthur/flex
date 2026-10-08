export function splitPhones(raw: string | null | undefined) {
  if (!raw) return []

  return raw
    .split(/[/,]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((label) => ({
      label,
      href: `tel:${label.replace(/[^\d+]/g, '')}`,
    }))
}

export function whatsappLink(raw: string | null | undefined) {
  if (!raw) return null

  let digits = raw.replace(/\D/g, '')

  if (digits.length === 10 || digits.length === 11) {
    digits = `55${digits}`
  }

  if (digits.length < 12) return null

  return `https://wa.me/${digits}`
}
