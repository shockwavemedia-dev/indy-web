import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const PrintExtrasOptions: Options<SelectOption<string>> = [
  { label: 'A0', value: 'A0' },
  { label: 'A1', value: 'A1' },
  { label: 'A2', value: 'A2' },
  { label: 'A3', value: 'A3' },
  { label: 'A4', value: 'A4' },
  { label: 'Pull Up Banner', value: 'Pull Up Banner' },
  { label: 'Blades Sign', value: 'Blades Sign' },
  { label: 'DL Postcard', value: 'DL Postcard' },
  { label: 'Doublesided DL', value: 'Doublesided DL' },
  { label: 'Doublesided A4', value: 'Doublesided A4' },
  { label: 'Custom', value: 'Custom' },
]
