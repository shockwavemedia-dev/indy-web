import { Options } from 'react-select'
import { Option } from '../../types/Option.type'

export const TicketAssigneeStatusOptions: Options<Option> = [
  { label: 'Completed', value: 'completed' },
  { label: 'In progress', value: 'in_progress' },
  { label: 'Open', value: 'open' },
]
