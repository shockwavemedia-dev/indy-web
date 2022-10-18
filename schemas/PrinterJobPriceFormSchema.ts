import { number, object, SchemaOf } from 'yup'
import { PrinterJobPriceForm } from '../types/forms/PrinterJobPriceForm.type'

export const PrinterJobPriceFormSchema: SchemaOf<PrinterJobPriceForm> = object().shape({
  price: number().required(),
})
