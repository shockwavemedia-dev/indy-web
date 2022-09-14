import { object, SchemaOf, string } from 'yup'
import { CreateSocialMediaCommentForm } from '../types/forms/CreateSocialMediaCommentForm.type'

export const CreateSocialMediaCommentFormSchema: SchemaOf<CreateSocialMediaCommentForm> =
  object().shape({
    comment: string().required(),
  })
