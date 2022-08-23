import { mixed, object, SchemaOf, string } from 'yup'
import { CreatePrinterForm } from '../types/forms/CreatePrinterForm.type'

export const CreatePrinterSchema: SchemaOf<CreatePrinterForm> = object().shape({
  companyName: string().required(),
  email: string().required(),
  password: string().required(),
  passwordConfirmation: string().required(),
  logo: mixed().optional().nullable(),
  contactName: string().optional().nullable(),
  phone: string().optional().nullable(),
  description: string().optional().nullable(),
})
