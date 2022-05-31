import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const GraphicExtraOptions: Options<SelectOption<string>> = [
  { label: 'DL', value: 'DL' },
  { label: 'A4', value: 'A4' },
  { label: 'A3', value: 'A3' },
  { label: 'A2', value: 'A2' },
  { label: 'A1', value: 'A1' },
  { label: 'POS', value: 'POS' },
  { label: 'Pull-up Banner', value: 'Pull-up Banner' },
  { label: 'Whats on Guide', value: 'Whats on Guide' },
  { label: 'Hi apps', value: 'Hi apps' },
  { label: 'Facebook', value: 'Facebook' },
  { label: 'Instagram', value: 'Instagram' },
  { label: 'TV Screen', value: 'TV Screen' },
]
