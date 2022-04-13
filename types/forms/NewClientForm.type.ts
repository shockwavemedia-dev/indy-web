export type NewClientForm = {
  name: string
  clientCode: string
  logo: File | null
  address: string
  phone: string
  timezone: string
  overview: string
  clientSince: Date | null
  rating: number
}
