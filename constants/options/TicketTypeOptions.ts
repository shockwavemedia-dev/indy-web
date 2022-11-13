import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const TicketTypeOptions: Options<SelectOption<string>> = [
  { label: 'Email', value: 'email' },
  { label: 'Library', value: 'library' },
  { label: 'Event', value: 'event' },
  { label: 'Project', value: 'project' },
  { label: 'Graphic', value: 'graphic' },
  { label: 'Print', value: 'print' },
  { label: 'Task', value: 'task' },
]
