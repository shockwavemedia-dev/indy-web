import { date, mixed, number, object, SchemaOf, string } from 'yup'
import { NewClientForm } from '../types/forms/NewClientForm.type'

export const NewClientFormSchema: SchemaOf<NewClientForm> = object().shape({
  name: string().required(),
  clientCode: string().optional().nullable(),
  logo: mixed().optional().nullable(),
  address: string().required(),
  phone: string().required(),
  timezone: string().required(),
  overview: string().required(),
  clientSince: date().required().nullable(),
  rating: number().required(),
  designatedDesignerId: number().optional(),
})
