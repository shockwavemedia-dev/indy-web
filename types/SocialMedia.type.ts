import { SocialMediaActivity } from './SocialMediaActivity.type'
import { SocialMediaCampaignType } from './SocialMediaCampaignType'
import { SocialMediaChannel } from './SocialMediaChannel.type'
import { SocialMediaComment } from './SocialMediaComment.type'
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
  campaignType: SocialMediaCampaignType
  status: SocialMediaStatus
  clientId: number
  channels: Array<SocialMediaChannel>
  boostedChannels?: Array<{ name: string; quantity?: number | string | null }> | null
  notes?: string | null
  activities?: Array<SocialMediaActivity>
  comments?: Array<SocialMediaComment>
  fileIds?: Array<number>
}
