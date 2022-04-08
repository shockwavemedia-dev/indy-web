import { Options } from 'react-select'
import { Option } from '../interfaces/Option.interface'

export const TicketTypeOptions: Options<Option> = [
  { label: 'Email', value: 'email' },
  { label: 'Event', value: 'event' },
  { label: 'Graphic', value: 'graphic' },
  { label: 'Print', value: 'print' },
  { label: 'Task', value: 'task' },
]
