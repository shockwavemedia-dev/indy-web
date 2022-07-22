import { Options } from 'react-select'
import { SelectOption } from '../../../types/SelectOption.type'

export const BookingTypeOptions: Options<SelectOption<string>> = [
  { label: 'Half Day Booking', value: 'Half Day Booking' },
  { label: 'Full Day Booking', value: 'Full Day Booking' },
  { label: 'Multiple Day Booking', value: 'Multiple Day Booking' },
]
