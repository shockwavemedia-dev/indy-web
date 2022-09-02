import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'
import { SocialMediaStatus } from '../../types/SocialMediaStatus.type'

export const SocialMediaStatusOptions: Options<SelectOption<SocialMediaStatus>> = [
  { label: 'To do', value: 'To do' },
  { label: 'In progress', value: 'In progress' },
  { label: 'To approve', value: 'To approve' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Scheduled', value: 'Scheduled' },
]
