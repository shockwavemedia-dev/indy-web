import { Options } from 'react-select'
import { SelectOption } from '../../../types/SelectOption.type'

export const ServiceTypeOptions: Options<SelectOption<string>> = [
  { label: 'Photography', value: 'Photography' },
  { label: 'Videography', value: 'Videography' },
  { label: 'Photography & Videography', value: 'Photography & Videography' },
]
