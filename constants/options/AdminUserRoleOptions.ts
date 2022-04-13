import { Options } from 'react-select'
import { Option } from '../../types/Option.type'

export const AdminUserRoleOptions: Options<Option> = [
  { label: 'Admin', value: 'admin' },
  { label: 'Account Manager', value: 'account_manager' },
  { label: 'Manager', value: 'manager' },
  { label: 'Staff', value: 'staff' },
]
