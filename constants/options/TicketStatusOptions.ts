import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const TicketStatusOptions: Options<SelectOption<string>> = [
  { label: 'Closed', value: 'closed' },
  { label: 'New', value: 'new' },
  { label: 'Pending', value: 'pending' },
  { label: 'On Hold', value: 'on hold' },
  { label: 'Open', value: 'open' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'Deleted', value: 'deleted' },
]
