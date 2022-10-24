import { Options } from 'react-select'
import { SelectOption } from '../../../types/SelectOption.type'

export const PrinterStatusOptions: Options<SelectOption<string>> = [
  { label: 'Awaiting Quote', value: 'Awaiting Quote' },
  { label: 'Awaiting Approval', value: 'Awaiting Approval' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Cancelled', value: 'Cancelled' },
]
