import { SocialMediaActivity } from './SocialMediaActivity.type'
import { SocialMediaChannel } from './SocialMediaChannel.type'
import { SocialMediaFile } from './SocialMediaFile.type'
import { SocialMediaStatus } from './SocialMediaStatus.type'

export type SocialMedia = {
  id: number
  post: string
  postDate: Date | null
  createdAt: Date
  createdBy: string
  updatedBy: Date
  attachments: Array<SocialMediaFile>
  copy?: string | null
  status: SocialMediaStatus
  clientId: number
  channels: Array<SocialMediaChannel>
  notes?: string | null
  activities?: Array<SocialMediaActivity>
}
