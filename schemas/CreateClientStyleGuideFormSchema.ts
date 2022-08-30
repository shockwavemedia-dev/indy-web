import { object, SchemaOf, string } from 'yup'
import { CreateClientStyleGuideForm } from '../types/forms/CreateClientStyleGuideForm.type'

export const CreateClientStyleGuideSchema: SchemaOf<CreateClientStyleGuideForm> = object().shape({
  styleGuide: string().required(),
})
