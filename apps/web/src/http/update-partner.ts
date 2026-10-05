import { axiosClient } from '../lib/axios-client'

type UpdatePartnerRequest = {
    id: string
    name?: string
    description?: string
    shortDescription?: string | null
    discount?: string
    address?: string | null
    phone?: string | null
    whatsapp?: string | null
    logoUrl?: string | null
    websiteUrl?: string | null
    couponCode?: string | null
    redemptionInstructions?: string | null
    categoryId?: string
    isActive?: boolean
    isFeatured?: boolean
}

type UpdatePartnerResponse = {
    partner: Partner
}

export async function updatePartner(
    input: UpdatePartnerRequest,
): Promise<UpdatePartnerResponse> {
    const { id, ...data } = input
    const response = await axiosClient.patch<UpdatePartnerResponse>(
        `/partners/${id}`,
        data,
    )

    return response.data
}
