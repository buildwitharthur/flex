import type { PublicPartner } from '../types/partner'

type PublicPartnersResponse = {
    partners: PublicPartner[]
}

export async function getPublicPartners(
    apiUrl: string | undefined,
): Promise<PublicPartner[]> {
    if (!apiUrl) {
        throw new Error('API_URL is not configured')
    }

    const baseUrl = apiUrl.replace(/\/+$/, '')
    const response = await fetch(`${baseUrl}/partners/public`)

    if (!response.ok) {
        throw new Error(`Failed to fetch partners: ${response.status}`)
    }

    const data = (await response.json()) as PublicPartnersResponse

    return data.partners
}
