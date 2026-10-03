import { axiosClient } from '../lib/axios-client'

type CreatePartnerRequest = {
    name: string
    description: string
    shortDescription?: string
    discount: string
    address?: string
    phone?: string
    whatsapp?: string
    logoUrl?: string
    websiteUrl?: string
    couponCode?: string
    redemptionInstructions?: string
    categoryId: string
}

type CreatePartnerResponse = {
    partner: Partner
}

export async function createPartner(
    input: CreatePartnerRequest,
): Promise<CreatePartnerResponse> {
    const response = await axiosClient.post<CreatePartnerResponse>(
        '/partners',
        input,
    )

    return response.data
}
