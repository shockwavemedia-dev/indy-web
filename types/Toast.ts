import { ToastType } from './ToastType.type'

export type Toast = {
  type: ToastType
  message: string
  duration?: number
  persistent?: boolean
}
