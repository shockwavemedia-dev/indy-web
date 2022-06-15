import { mixed, number, object, SchemaOf, string } from 'yup'
import { EditAnimationForm } from '../types/forms/EditAnimationForm.type'

export const EditAnimationFormSchema: SchemaOf<EditAnimationForm> = object().shape({
  title: string().required(),
  description: string().optional().nullable(),
  libraryCategoryId: number().required(),
  file: mixed().optional().nullable(),
})
