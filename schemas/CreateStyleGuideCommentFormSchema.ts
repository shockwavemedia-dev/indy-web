import { object, SchemaOf, string } from 'yup'
import { CreateStyleGuideCommentForm } from '../types/forms/CreateStyleGuideCommentForm.type'
import { richTextEmptyCheck } from '../utils/FormHelpers'

export const CreateStyleGuideCommentFormSchema: SchemaOf<CreateStyleGuideCommentForm> =
  object().shape({
    message: string()
      .required()
      .test('draft-js-empty-check', 'Message is a required field', richTextEmptyCheck),
  })
