import { SocialMediaFile } from '../SocialMediaFile.type'

export type CreateSocialMediaForm = {
  post?: string | null
  postDate?: Date | null
  postTime?: Date | null
  attachments?: Array<SocialMediaFile> | null
  copy?: string | null
  status?: string | null
  channels?: Array<string> | null
  notes?: string | null
}
