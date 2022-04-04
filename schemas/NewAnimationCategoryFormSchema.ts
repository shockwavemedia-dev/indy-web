import { object, SchemaOf, string } from 'yup'
import { NewAnimationCategoryForm } from '../interfaces/NewAnimationCategoryForm.interface'

export const NewAnimationCategoryFormSchema: SchemaOf<NewAnimationCategoryForm> = object().shape({
  name: string().required(),
})
