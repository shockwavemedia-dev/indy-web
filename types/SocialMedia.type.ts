import { SocialMediaChannel } from '../SocialMediaChannel.type'
import { SocialMediaStatus } from '../SocialMediaStatus.type'

export type SocialMedia = {
  post: string
  postDate: string | null
  postTime?: string | null
  attachments: Array<File>
  copy?: string | null
  status: SocialMediaStatus
  channels: Array<SocialMediaChannel>
  notes?: string | null
}
