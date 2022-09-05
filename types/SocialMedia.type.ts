import { SocialMediaChannel } from './SocialMediaChannel.type'
import { SocialMediaFile } from './SocialMediaFile.type'
import { SocialMediaStatus } from './SocialMediaStatus.type'

export type SocialMedia = {
  id: number
  post: string
  postDate: string | null
  postTime?: string | null
  attachments: Array<SocialMediaFile>
  copy?: string | null
  status: SocialMediaStatus
  channels: Array<SocialMediaChannel>
  notes?: string | null
}
