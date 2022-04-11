import { object, SchemaOf, string } from 'yup'
import { NewAnimationCategoryForm } from '../types/NewAnimationCategoryForm.type'

export const NewAnimationCategoryFormSchema: SchemaOf<NewAnimationCategoryForm> = object().shape({
  name: string().required(),
})
