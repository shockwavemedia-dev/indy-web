import { TodoStatus } from './TodoStatus.type'

export type Todo = {
  name: string
  status?: TodoStatus
  assignee?: string
  deadline?: Date
  custom: boolean
  selected: boolean
}
