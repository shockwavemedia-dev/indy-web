import { mixed, number, object, SchemaOf, string } from 'yup'
import { NewAnimationForm } from '../interfaces/NewAnimationForm.interface'

export const NewAnimationFormSchema: SchemaOf<NewAnimationForm> = object().shape({
  title: string().required(),
  description: string().optional(),
  libraryCategoryId: number().required(),
  file: mixed().required(),
})