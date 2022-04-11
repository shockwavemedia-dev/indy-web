import { date, number, object, SchemaOf, string } from 'yup'
import { NewClientForm } from '../interfaces/NewClientForm.interface'

export const NewClientFormSchema: SchemaOf<NewClientForm> = object().shape({
  name: string().required(),
  clientCode: string().required(),
  logo: string().required(),
  address: string().required(),
  phone: string().required(),
  timezone: string().required(),
  overview: string().required(),
  clientSince: date().required().nullable(),
  rating: number().required(),
})
