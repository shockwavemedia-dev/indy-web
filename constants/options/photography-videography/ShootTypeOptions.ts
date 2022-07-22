import { Options } from 'react-select'
import { SelectOption } from '../../../types/SelectOption.type'

export const ShootTypeOptions: Options<SelectOption<string>> = [
  { label: 'Architecture/Venue', value: 'Architecture/Venue' },
  { label: 'Event Shoot', value: 'Event Shoot' },
  { label: 'Food Photography', value: 'Food Photography' },
  { label: 'Staff/Headshots', value: 'Staff/Headshots' },
]
