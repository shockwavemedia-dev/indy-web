import { Options } from 'react-select'
import { Option } from '../../types/Option.type'

export const ClientUserRoleOptions: Options<Option> = [
  { label: 'Group manager', value: 'group_manager' },
  { label: 'Marketing Manager', value: 'marketing_manager' },
  { label: 'Marketing', value: 'marketing' },
]
