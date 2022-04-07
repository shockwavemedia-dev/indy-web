import { User } from './User.interface'

export interface Department {
  id: number
  name: string
  description: string
  status: 'active' | 'deleted' | 'inactive'
  minDeliveryDays: number
  users?: Array<User>
}
