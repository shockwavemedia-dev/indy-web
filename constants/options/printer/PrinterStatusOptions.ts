import { Options } from 'react-select'
import { SelectOption } from '../../../types/SelectOption.type'

export const PrinterStatusOptions: Options<SelectOption<string>> = [
  { label: 'Todo', value: 'Todo' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Cancelled', value: 'Cancelled' },
]
