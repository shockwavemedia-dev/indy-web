import { object, SchemaOf, string } from 'yup'
import { CreateEmailForm } from '../types/forms/CreateEmailForm.type'
import { richTextEmptyCheck } from '../utils/FormHelpers'

export const CreateEmailFormSchema: SchemaOf<CreateEmailForm> = object().shape({
  cc: string().required(),
  message: string()
    .required()
    .test('draft-js-empty-check', 'Message is a required field', richTextEmptyCheck),
})
