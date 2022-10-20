import { number, object, SchemaOf } from 'yup'
import { ClientPrinterForm } from '../types/forms/ClientPrinterForm.type'

export const ClientPrinterFormSchema: SchemaOf<ClientPrinterForm> = object().shape({
  printerId: number().required(),
})
