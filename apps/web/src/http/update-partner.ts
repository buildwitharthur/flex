import { axiosClient } from '../lib/axios-client'

type UpdatePartnerRequest = {
    id: string
    name?: string
    description?: string
    shortDescription?: string
    discount?: string
    address?: string
    phone?: string
    whatsapp?: string
    logoUrl?: string
    websiteUrl?: string
    couponCode?: string
    redemptionInstructions?: string
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
