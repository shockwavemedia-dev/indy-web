import { MultiValue, OnChangeValue, SingleValue } from 'react-select'
import { SelectOption } from '../types/SelectOption.type'

export const isSingleValue = <T extends unknown>(
  x: OnChangeValue<SelectOption<T>, boolean>
): x is SingleValue<SelectOption<T>> => !!x && 'value' in x

export const isMultiValue = <T extends unknown>(
  x: OnChangeValue<SelectOption<T>, boolean>
): x is MultiValue<SelectOption<T>> =>
  !!x && Array.isArray(x) && x.some((option: SelectOption<T>) => 'value' in option)
