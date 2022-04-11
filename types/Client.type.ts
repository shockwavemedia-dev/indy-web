export type Client = {
  id: number
  name: string
  clientCode: string
  logo: string
  address: string
  phone: string
  timezone: string
  clientSince: Date
  mainClientId: number
  overview: string
  rating: number
  status: 'active' | 'inactive' | 'deleted'
}
