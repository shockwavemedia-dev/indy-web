export type CreatePrinterForm = {
  companyName: string
  email: string
  password: string
  passwordConfirmation: string
  logo?: File | null
  contactName?: string | null
  phone?: string | null
  description?: string | null
}
