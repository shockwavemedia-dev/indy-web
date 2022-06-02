import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'
import { TicketAssigneeStatus } from '../../types/TicketAssigneeStatus.type'

export const TicketAssigneeStatusOptions: Options<SelectOption<TicketAssigneeStatus>> = [
  { label: 'Completed', value: 'completed' },
  { label: 'In Progress', value: 'in progress' },
  { label: 'Open', value: 'open' },
]
