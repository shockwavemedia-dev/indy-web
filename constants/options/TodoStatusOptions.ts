import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'
import { TodoStatus } from '../../types/TodoStatus.type'

export const TodoStatusOptions: Options<SelectOption<TodoStatus>> = [
  { label: 'Todo', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
]
