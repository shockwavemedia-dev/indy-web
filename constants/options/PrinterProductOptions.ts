import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'

export const PrinterProductOptions: Options<SelectOption<string>> = [
  { label: 'Business Cards', value: 'Business Cards' },
  { label: 'Coasters', value: 'Coasters' },
  { label: 'Envelope', value: 'Envelope' },
  { label: 'Flyer', value: 'Flyer' },
  { label: 'Folded Brochure', value: 'Folded Brochure' },
  { label: 'Presentation Folders', value: 'Presentation Folders' },
  { label: 'Postcards', value: 'Postcards' },
  { label: 'Posters', value: 'Posters' },
  { label: 'Pull Up Banner', value: 'Pull Up Banner' },
]
