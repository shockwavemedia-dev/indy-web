import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const AdvertisingExtraOptions: Options<SelectOption<string>> = [
  { label: 'Facebook', value: 'Facebook' },
  { label: 'Instagram', value: 'Instagram' },
  { label: 'Youtube', value: 'Youtube' },
  { label: 'Twitter', value: 'Twitter' },
  { label: 'TV Network', value: 'TV Network' },
  { label: 'Custom', value: 'Custom' },
]
