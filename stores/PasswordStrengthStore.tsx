import createStore from 'zustand'
import { combine } from 'zustand/middleware'

export const usePasswordStrengthStore = createStore(
  combine({ passwordStrength: 0 }, (set) => ({
    computePasswordStrength: (password: string) => {
      let computedPasswordStrength = 0

      if (password.length > 7) {
        computedPasswordStrength++
      }

      if (password.match(/[a-z]/)) {
        computedPasswordStrength++
      }

      if (password.match(/[A-Z]/)) {
        computedPasswordStrength++
      }

      if (password.match(/[\s`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        computedPasswordStrength++
      }

      if (password.match(/[0-9]/)) {
        computedPasswordStrength++
      }

      set(() => ({ passwordStrength: computedPasswordStrength }))
    },
  }))
)
