import { mixed, number, object, SchemaOf, string } from 'yup'
import { NewAnimationForm } from '../types/forms/NewAnimationForm.type'

export const NewAnimationFormSchema: SchemaOf<NewAnimationForm> = object().shape({
  title: string().required(),
  description: string().optional(),
  libraryCategoryId: number().required(),
  file: mixed().required(),
})
