import { ToastType } from './ToastType.type'

export type ToastProps = {
  type: ToastType
  message: string
  duration?: number
  persistent?: boolean
}
