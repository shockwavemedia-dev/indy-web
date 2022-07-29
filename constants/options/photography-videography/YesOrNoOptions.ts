import { Options } from 'react-select'
import { SelectOption } from '../../../types/SelectOption.type'

export const YesOrNoOptions: Options<SelectOption<string>> = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
]
