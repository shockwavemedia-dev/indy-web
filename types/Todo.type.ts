import { TodoStatus } from './TodoStatus.type'

export type Todo = {
  id?: number
  name: string
  status?: TodoStatus
  assignees?: Array<
    | {
        id: number
        taskId: number
        userId: number
        status: TodoStatus
        deadline?: Date
        createdAt: Date
        updatedAt: Date
      }
    | number
  >
  deadline?: Date
  notify: boolean
  custom: boolean
  selected: boolean
}
