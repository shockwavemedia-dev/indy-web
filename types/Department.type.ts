import { User } from './User.type'

export type Department = {
  id: number
  name: string
  description: string
  status: 'active' | 'deleted' | 'inactive'
  minDeliveryDays: number
  users?: Array<User>
}
