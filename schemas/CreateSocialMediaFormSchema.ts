import { array, date, mixed, object, SchemaOf, string } from 'yup'
import { CreateSocialMediaForm } from '../types/forms/CreateSocialMediaForm.type'

export const CreateSocialMediaFormSchema: SchemaOf<CreateSocialMediaForm> = object().shape({
  post: string().required(),
  postDate: date().nullable(),
  postTime: date().nullable(),
  attachments: array().of(mixed().optional()),
  copy: string().optional(),
  status: mixed().optional().oneOf(['To Do', 'In Progress', 'To Approve', 'Approved', 'Scheduled']),
  channels: array().of(mixed().optional()),
  notes: string().optional(),
})
