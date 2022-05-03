import { MultiValue, PropsValue, SingleValue } from 'react-select'
import { Option } from '../types/Option.type'

export const isSingleValue = <T extends unknown>(
  x: PropsValue<Option<T>>
): x is SingleValue<Option<T>> => !!x && 'value' in x

export const isMultiValue = <T extends unknown>(
  x: PropsValue<Option<T>>
): x is MultiValue<Option<T>> =>
  !!x && Array.isArray(x) && x.some((option: Option<T>) => 'value' in option)
