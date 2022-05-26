import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const TicketAssigneeStatusOptions: Options<SelectOption<string>> = [
  { label: 'Completed', value: 'completed' },
  { label: 'In progress', value: 'in progress' },
  { label: 'Open', value: 'open' },
]
