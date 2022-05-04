import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const UserGenderOptions: Options<SelectOption<string>> = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
]
