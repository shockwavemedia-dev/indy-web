import { Options } from 'react-select'
import { SelectOption } from '../../../types/SelectOption.type'

export const StockOptions: Options<SelectOption<string>> = [
  { label: 'Uncoated', value: 'Uncoated' },
  { label: 'Gloss', value: 'Gloss' },
  { label: 'Matt', value: 'Matt' },
]
