import { array, mixed, object, SchemaOf, string } from 'yup'
import { SocialMedia } from '../types/forms/SocialMedia.type'

export const CreateSocialMediaFormSchema: SchemaOf<SocialMedia> = object().shape({
  post: string().required(),
  postDate: string().required(),
  postTime: string().optional(),
  attachments: array().of(mixed().optional()),
  copy: string().required(),
  status: mixed().required().oneOf(['To do', 'In progress', 'To approve', 'Approved', 'Scheduled']),
  channels: array().of(
    mixed().required().oneOf(['Story', 'Facebook', 'Instagram', 'Twitter', 'Linkedin'])
  ),
  notes: string().optional(),
})
