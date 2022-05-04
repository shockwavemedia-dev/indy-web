import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const AdminUserRoleOptions: Options<SelectOption<string>> = [
  { label: 'Admin', value: 'admin' },
  { label: 'Account Manager', value: 'account_manager' },
  { label: 'Manager', value: 'manager' },
  { label: 'Staff', value: 'staff' },
]
