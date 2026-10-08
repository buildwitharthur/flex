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

type UserRole = 'ADMIN' | 'STAFF'

type User = {
    id: string
    name: string
    username: string
    email: string | null
    role: UserRole
    isActive: boolean
    createdAt: string
    updatedAt: string
}

type ContactSource = 'WEBSITE' | 'MANUAL'

type ContactStage =
    | 'NEW'
    | 'CONTACTED'
    | 'NEGOTIATION'
    | 'COMPLETED'
    | 'LOST'

type Contact = {
    id: string
    name: string
    email: string | null
    phone: string
    source: ContactSource
    stage: ContactStage
    createdAt: string
    updatedAt: string
}
