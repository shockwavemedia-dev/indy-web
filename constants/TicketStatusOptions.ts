import { Options } from 'react-select'
import { Option } from '../types/Option.type'

export const TicketStatusOptions: Options<Option> = [
  { label: 'Closed', value: 'closed' },
  { label: 'New', value: 'new' },
  { label: 'Pending', value: 'pending' },
  { label: 'On Hold', value: 'on_hold' },
  { label: 'Open', value: 'open' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'Deleted', value: 'deleted' },
]
