import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'
import { SocialMediaChannel } from '../../types/SocialMediaChannel.type'

export const SocialMediaChannelOptions: Options<SelectOption<SocialMediaChannel>> = [
  { label: 'Story', value: 'Story' },
  { label: 'Facebook', value: 'Facebook' },
  { label: 'Facebook Post', value: 'Facebook Post' },
  { label: 'Facebook Event', value: 'Facebook Event' },
  { label: 'Instagram', value: 'Instagram' },
  { label: 'Linkedin', value: 'Linkedin' },
  { label: 'Tik Tok', value: 'Tik Tok' },
  { label: 'Video Reels', value: 'Video Reels' },
]
