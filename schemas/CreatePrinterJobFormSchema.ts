import { object, SchemaOf, string } from 'yup'
import { CreatePrinterJobForm } from '../types/forms/CreatePrinterJobForm.type'

export const CreatePrinterJobFormSchema: SchemaOf<CreatePrinterJobForm> = object().shape({
  description: string().required(),
  quantity: string().required(),
})
