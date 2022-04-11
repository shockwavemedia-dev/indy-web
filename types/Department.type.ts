import { User } from './User.type'

export interface Department {
  id: number
  name: string
  description: string
  status: 'active' | 'deleted' | 'inactive'
  minDeliveryDays: number
  users?: Array<User>
}
