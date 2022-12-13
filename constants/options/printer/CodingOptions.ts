import { Options } from 'react-select'
import { SelectOption } from '../../../types/SelectOption.type'

export const CodingOptions: Options<SelectOption<string>> = [
  { label: 'Light gsm paper', value: 'Light gsm paper' },
  { label: 'Medium gsm paper', value: 'Medium gsm paper' },
  { label: 'Heavy gsm paper', value: 'Heavy gsm paper' },
  { label: 'Light gsm board', value: 'Light gsm board' },
  { label: 'Medium gsm board', value: 'Medium gsm board' },
  { label: 'Heavy gsm board', value: 'Heavy gsm board' },
]
