import { SocialMediaChannel } from '../SocialMediaChannel.type'
import { SocialMediaStatus } from '../SocialMediaStatus.type'

export type SocialMedia = {
  post: string
  postDate?: Date | null
  postTime?: Date | null
  attachments: Array<File>
  copy?: string | null
  status: SocialMediaStatus
  channels: Array<SocialMediaChannel>
  notes?: string | null
}
