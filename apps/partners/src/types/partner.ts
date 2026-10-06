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

export type PartnerSort = 'featured' | 'name' | 'discount'
