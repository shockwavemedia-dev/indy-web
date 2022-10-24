import { mixed, object, SchemaOf, string } from 'yup'
import { CreateScreenForm } from '../types/forms/CreateScreenForm.type'

export const CreateScreenSchema: SchemaOf<CreateScreenForm> = object().shape({
  name: string().required(),
  logo: mixed().optional().nullable(),
})
