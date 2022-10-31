import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'
import { TodoStatus } from '../../types/TodoStatus.type'

export const TodoStatusOptions: Options<SelectOption<TodoStatus>> = [
  { label: 'Todo', value: 'Todo' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Completed', value: 'Completed' },
]
