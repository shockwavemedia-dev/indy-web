import { Options } from 'react-select'
import { SelectOption } from '../../../types/SelectOption.type'

export const PrinterDeliveryOptions: Options<SelectOption<string>> = [
  { label: 'To Venue', value: 'To Venue' },
  { label: 'Pick Up from Printer', value: 'Pick Up from Printer' },
]
