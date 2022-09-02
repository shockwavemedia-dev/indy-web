import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const SocialMediaChannelsOptions: Options<SelectOption<string>> = [
  { label: 'Story', value: 'Story' },
  { label: 'Facebook', value: 'Facebook' },
  { label: 'Instagram', value: 'Instagram' },
  { label: 'Twitter', value: 'Twitter' },
  { label: 'Linkedin', value: 'Linkedin' },
]
