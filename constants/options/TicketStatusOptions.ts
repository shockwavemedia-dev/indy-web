import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const TicketStatusOptions: Options<SelectOption<string>> = [
  { label: 'Closed', value: 'closed' },
  { label: 'New', value: 'new' },
  { label: 'Pending', value: 'pending' },
  { label: 'Open', value: 'open' },
  { label: 'In Progress', value: 'in_progress' },
]
