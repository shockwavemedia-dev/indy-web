import { mixed, number, object, SchemaOf, string } from 'yup'
import { NewAnimationForm } from '../interfaces/NewAnimationForm.interface'

export const NewAnimationFormSchema: SchemaOf<NewAnimationForm> = object().shape({
  title: string().required(),
  description: string().optional(),
  library_category_id: number().required(),
  file: mixed().required(),
})
