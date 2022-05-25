import { array, mixed, object, SchemaOf, string } from 'yup'
import { CreateFileFeedbackForm } from '../types/forms/CreateFileFeedbackForm.type'
import { richTextEmptyCheck } from '../utils/FormHelpers'

export const CreateFileFeedbackFormSchema: SchemaOf<CreateFileFeedbackForm> = object().shape({
  feedback: string()
    .required()
    .test('draft-js-empty-check', 'Feedback is a required field', richTextEmptyCheck),
  attachment: array().of(mixed().optional()),
})
