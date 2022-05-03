import { Options } from 'react-select'
import { Option } from '../../types/Option.type'

export const UserGenderOptions: Options<Option<string>> = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
]
