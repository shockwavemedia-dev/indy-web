import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const WebsiteExtraOptions: Options<SelectOption<string>> = [
  { label: 'Homepage Header', value: 'Homepage Header' },
  { label: "What's On", value: "What's On" },
  { label: 'Bistro', value: 'Bistro' },
  { label: 'Custom', value: 'Custom' },
]
