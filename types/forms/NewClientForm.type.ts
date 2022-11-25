export type NewClientForm = {
  name: string
  clientCode?: string | null
  logo: File | null
  address: string
  phone: string
  timezone: string
  overview: string
  clientSince: Date | null
  rating: number | null
  designatedDesignerId?: number | null
  designatedAnimatorId?: number | null
  designatedWebEditorId?: number | null
  designatedSocialMediaManagerId?: number | null
  designatedPrinterManagerId?: number | null
}
