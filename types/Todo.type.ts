import { TodoStatus } from './TodoStatus.type'

export type Todo = {
  id?: number
  name: string
  status?: TodoStatus
  assignee?: string
  deadline?: Date
  notify: boolean
  custom: boolean
  selected: boolean
}
