import { Options } from 'react-select'
import { SelectOption } from '../../../types/SelectOption.type'

export const DishesOptions: Options<SelectOption<string>> = [
  { label: '1-20', value: '1-20' },
  { label: '20-50', value: '20-50' },
  { label: '50+', value: '50+' },
]
