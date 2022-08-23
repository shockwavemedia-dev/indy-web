export type EditPrinterForm = {
  email: string
  companyName: string
  contactName?: string | null
  phone?: string | null
  description?: string | null
  companyLogoUrl?: string | null
  logo?: File
}
