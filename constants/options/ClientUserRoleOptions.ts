import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const ClientUserRoleOptions: Options<SelectOption<string>> = [
  { label: 'Group manager', value: 'group_manager' },
  { label: 'Marketing Manager', value: 'marketing_manager' },
  { label: 'Marketing', value: 'marketing' },
]
