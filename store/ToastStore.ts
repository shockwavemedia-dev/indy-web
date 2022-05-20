import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { ToastProps } from '../types/ToastProps'

export const useToastStore = createStore(
  combine(
    {
      toastId: -1,
      toasts: <Record<number, ToastProps>>{},
    },
    (set, get) => ({
      showToast: ({ type, message, duration = 5000, persistent = false }: ToastProps) =>
        set(() => ({
          toasts: { [get().toastId++]: { type, message, duration, persistent }, ...get().toasts },
        })),
      closeToast: (toastId: number) => {
        const { [toastId]: _, ...toasts } = get().toasts

        set(() => ({ toasts }))
      },
    })
  )
)
