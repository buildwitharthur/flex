import type { PublicPartner } from '../types/partner'

type PublicPartnersResponse = {
  partners: PublicPartner[]
}

export async function getPublicPartners(
  apiUrl: string,
): Promise<PublicPartner[]> {
  const response = await fetch(
    `${apiUrl.replace(/\/$/, '')}/partners/public`,
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch partners: ${response.status}`)
  }

  const data = await response.json() as PublicPartnersResponse

  return data.partners
}
