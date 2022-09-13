import { SocialMediaActivityFields } from './SocialMediaActivityFields.type'

export type SocialMediaActivity = {
  action: string
  user: string
  fields: SocialMediaActivityFields
}
