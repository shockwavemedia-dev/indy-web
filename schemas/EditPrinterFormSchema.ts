import { mixed, object, SchemaOf, string } from 'yup'
import { EditPrinterForm } from '../types/forms/EditPrinterForm.type'

export const EditPrinterSchema: SchemaOf<EditPrinterForm> = object().shape({
  companyName: string().required(),
  email: string().required(),
  logo: mixed().optional().nullable(),
  contactName: string().optional().nullable(),
  phone: string().optional().nullable(),
  description: string().optional().nullable(),
  companyLogoUrl: string().optional().nullable(),
})
