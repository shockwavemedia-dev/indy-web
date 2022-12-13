import { Options } from 'react-select'
import { SelectOption } from '../../../types/SelectOption.type'

export const FormatOptions: Options<SelectOption<string>> = [
  { label: 'Landscape', value: 'Landscape' },
  { label: 'Portrait', value: 'Portrait' },
]
