import { ComponentType } from 'react'

export interface Navigation {
  Icon?: ComponentType<{ className?: string }>
  title: string
  pathname?: string
  children?: Array<Navigation>
}
