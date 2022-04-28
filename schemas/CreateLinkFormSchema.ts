import { object, SchemaOf, string } from 'yup'
import { CreateLinkForm } from '../types/forms/CreateLinkForm.type'

export const CreateLinkFormSchema: SchemaOf<CreateLinkForm> = object().shape({
  text: string().required(),
  link: string().url().required(),
})
