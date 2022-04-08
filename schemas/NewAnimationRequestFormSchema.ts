import { number, object, SchemaOf, string } from 'yup'
import { NewAnimationRequestForm } from '../interfaces/NewAnimationRequestForm.interface'

export const NewAnimationRequestFormSchema: SchemaOf<NewAnimationRequestForm> = object().shape({
  libraryId: number().required(),
  description: string().optional(),
})
