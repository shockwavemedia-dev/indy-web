export type Notification = {
  id: number
  title: string
  status: 'new' | 'read' | 'deleted'
  url: string
  createdAt: Date
}
