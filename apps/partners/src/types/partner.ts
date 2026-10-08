export interface PartnerCategory {
    id: string
    name: string
    slug: string
    icon: string | null
}

export interface PublicPartner {
    id: string
    name: string
    slug: string
    description: string
    shortDescription: string | null
    discount: string
    address: string | null
    phone: string | null
    whatsapp: string | null
    logoUrl: string | null
    websiteUrl: string | null
    couponCode: string | null
    redemptionInstructions: string | null
    isFeatured: boolean
    category: PartnerCategory
}

export interface PartnerCategoryFilter {
    key: string
    name: string
    count: number
}
