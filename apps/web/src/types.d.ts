type Category = {
    id: string
    name: string
    slug: string
    icon: string | null
    partnersCount: number
    createdAt: string
    updatedAt: string
}

type Partner = {
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
    isActive: boolean
    isFeatured: boolean
    categoryId: string
    category: {
        id: string
        name: string
        slug: string
    }
    createdAt: string
    updatedAt: string
}

type ContactType = 'PARTNER' | 'MEMBER'

type ContactStage =
    | 'NEW'
    | 'CONTACTED'
    | 'NEGOTIATION'
    | 'COMPLETED'
    | 'LOST'

type Contact = {
    id: string
    type: ContactType
    name: string
    company: string | null
    email: string | null
    phone: string
    stage: ContactStage
    createdAt: string
    updatedAt: string
}
