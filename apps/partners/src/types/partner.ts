export interface PublicPartner {
    id: string
    name: string
    description: string
    discount: string
    isFeatured: boolean
    category: {
        id: string
        name: string
    }
}

export interface PartnerCategoryFilter {
    key: string
    name: string
    count: number
}
