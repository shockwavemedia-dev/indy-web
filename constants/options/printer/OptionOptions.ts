import { Options } from 'react-select'
import { SelectOption } from '../../../types/SelectOption.type'

export const OptionOptions: Options<SelectOption<string>> = [
  { label: 'One sided', value: 'One sided' },
  { label: 'Two sided', value: 'Two sided' },
]
