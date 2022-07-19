export type MarketingPlanner = {
  id: number
  clientId: number
  eventName: string
  description: string
  todoList?: Array<string>
  taskManagement?: Array<string>
  startDate: Date
  endDate: Date
  isRecurring: boolean
}
