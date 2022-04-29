import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { Toast } from '../types/Toast'

export const useToastStore = createStore(
  combine(
    {
      toastId: -1,
      toasts: <Record<number, Toast>>{},
    },
    (set, get) => ({
      showToast: ({ type, message, duration = 5000, persistent = false }: Toast) =>
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
