import { array, date, mixed, object, SchemaOf, string } from 'yup'
import { CreateSocialMediaForm } from '../types/forms/CreateSocialMediaForm.type'

export const CreateSocialMediaFormSchema: SchemaOf<CreateSocialMediaForm> = object().shape({
  post: string().required(),
  postDate: date().nullable(),
  postTime: date().nullable(),
  campaignType: string().nullable(),
  attachments: array().of(mixed().optional()),
  copy: string().optional().nullable(),
  status: mixed()
    .optional()
    .oneOf(['To Do', 'In Progress', 'To Approve', 'Approved', 'Scheduled', 'Client Created Draft']),
  channels: array().of(mixed().optional()),
  notes: string().optional().nullable(),
})
