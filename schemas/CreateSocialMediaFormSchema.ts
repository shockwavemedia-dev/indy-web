import { array, mixed, object, SchemaOf, string } from 'yup'
import { CreateSocialMediaForm } from '../types/forms/CreateSocialMediaForm.type'

export const CreateSocialMediaFormSchema: SchemaOf<CreateSocialMediaForm> = object().shape({
  post: string().required(),
  postDate: string().required(),
  postTime: string().optional(),
  attachments: array().of(mixed().optional()),
  copy: string().required(),
  status: string().required(),
  channels: array().of(mixed().required()),
  notes: string().optional(),
})
