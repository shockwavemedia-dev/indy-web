import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const AnimationExtraOptions: Options<SelectOption<string>> = [
  { label: 'Bank Ends', value: 'Bank Ends' },
  { label: 'Landscape', value: 'Landscape' },
  { label: 'Portrait', value: 'Portrait' },
  { label: 'MP4', value: 'MP4' },
  { label: 'POS', value: 'POS' },
  { label: 'EGM', value: 'EGM' },
  { label: 'Custom', value: 'Custom' },
  { label: 'Social Media', value: 'Social Media' },
]
