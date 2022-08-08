import { TodoStatus } from './TodoStatus.type'

export type Todo = {
  id?: number
  name: string
  status?: TodoStatus
  assignee?: string
  deadline?: Date
  custom: boolean
  selected: boolean
}
