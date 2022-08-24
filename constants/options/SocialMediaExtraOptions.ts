import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const SocialMediaExtraOptions: Options<SelectOption<string>> = [
  { label: 'Facebook Event', value: 'Facebook Event' },
  { label: 'Facebook Post', value: 'Facebook Post' },
  { label: 'Instagram', value: 'Instagram' },
  { label: 'Twitter', value: 'Twitter' },
]
