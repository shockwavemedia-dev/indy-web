export type Notification = {
  id: number
  title: string
  status: 'new' | 'read' | 'deleted'
  url: string
  created_at: Date
}
