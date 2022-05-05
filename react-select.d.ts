import 'react-select'
import { Icon } from './types/Icon.type'

declare module 'react-select/dist/declarations/src/Select' {
  export interface Props<Option, IsMulti extends boolean = false, Group extends GroupBase<Option>> {
    Icon: Icon
    label?: string
  }
}
