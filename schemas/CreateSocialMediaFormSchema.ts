import { array, date, mixed, object, SchemaOf, string } from 'yup'
import { CreateSocialMediaForm } from '../types/forms/CreateSocialMediaForm.type'

export const CreateSocialMediaFormSchema: SchemaOf<CreateSocialMediaForm> = object().shape({
  post: string().required(),
  postDate: date().required().nullable(),
  postTime: date().required().nullable(),
  attachments: array().of(mixed().optional()),
  copy: string().optional(),
  status: mixed().optional().oneOf(['To Do', 'In Progress', 'To Approve', 'Approved', 'Scheduled']),
  channels: array().of(
    mixed().optional().oneOf(['Story', 'Facebook', 'Instagram', 'Twitter', 'Linkedin'])
  ),
  notes: string().optional(),
})
