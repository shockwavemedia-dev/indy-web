import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const TicketTypeOptions: Options<SelectOption<string>> = [
  { label: 'Email', value: 'email' },
  { label: 'Event', value: 'event' },
  { label: 'Graphic', value: 'graphic' },
  { label: 'Print', value: 'print' },
  { label: 'Task', value: 'task' },
]
