import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'
import { SocialMediaStatus } from '../../types/SocialMediaStatus.type'

export const SocialMediaStatusOptions: Options<SelectOption<SocialMediaStatus>> = [
  { label: 'To Do', value: 'To Do' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'To Approve', value: 'To Approve' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Scheduled', value: 'Scheduled' },
  { label: 'Client Created Draft', value: 'Client Created Draft' },
]
