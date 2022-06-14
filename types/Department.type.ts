import { DepartmentMember } from './pages/DepartmentMember.type'
import { Service } from './Service.type'
import { User } from './User.type'

export type Department = {
  id: number
  name: string
  description: string
  status: 'active' | 'deleted' | 'inactive'
  minDeliveryDays: number
  users?: Array<User>
  services?: Array<Service>
  members?: Array<DepartmentMember>
}
