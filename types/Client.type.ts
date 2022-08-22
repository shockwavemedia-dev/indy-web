export type Client = {
  id: number
  name: string
  clientCode: string
  address: string
  phone: string
  timezone: string
  clientSince: Date
  overview: string
  rating: number
  status: 'active' | 'inactive' | 'deleted'
  designatedDesignerId?: number
  designatedDesigner?: string
  logoUrl: string
  logoThumbnailUrl: string
  ownerId: number
}
