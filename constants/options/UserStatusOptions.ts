import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const UserStatusOptions: Options<SelectOption<string>> = [
  { label: 'Active', value: 'active' },
  { label: 'Guest', value: 'guest' },
  { label: 'Invited', value: 'invited' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Not Verified', value: 'not verified' },
  { label: 'Revoked', value: 'revoked' },
  { label: 'Deleted', value: 'deleted' },
]
