import { number, object, SchemaOf, string } from 'yup'
import { NewAnimationRequestForm } from '../types/forms/NewAnimationRequestForm.type'

export const NewAnimationRequestFormSchema: SchemaOf<NewAnimationRequestForm> = object().shape({
  libraryId: number().required(),
  description: string().optional(),
})
