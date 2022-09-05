import { SocialMediaFile } from '../SocialMediaFile.type'

export type CreateSocialMediaForm = {
  post: string
  postDate: string | null
  postTime?: string | null
  attachments: Array<SocialMediaFile>
  copy?: string | null
  status: string
  channels: Array<string>
  notes?: string | null
}
