import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'
import { SocialMediaChannel } from '../../types/SocialMediaChannel.type'

export const SocialMediaChannelOptions: Options<SelectOption<SocialMediaChannel>> = [
  { label: 'Story', value: 'Story' },
  { label: 'Facebook', value: 'Facebook' },
  { label: 'Instagram', value: 'Instagram' },
  { label: 'Twitter', value: 'Twitter' },
  { label: 'Linkedin', value: 'Linkedin' },
]
