import 'react-select'
import { Props } from 'react-select'
import { Icon } from './types/Icon.type'

declare module 'react-select' {
  interface CommonPropsAndClassName {
    selectProps: Props<Option, IsMulti, Group> & {
      Icon: Icon
    }
  }
}

declare module 'react-select/dist/declarations/src/Select' {
  export interface Props<Option, IsMulti, Group> {
    Icon: Icon
  }
}
