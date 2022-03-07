import { SetState } from 'zustand'
import { State } from '../store'

export interface PasswordStrengthSlice {
  strength: number
  computePasswordStrength: (password: string) => void
}

const createPasswordStrengthSlice = (set: SetState<State>) => {
  return {
    strength: 0,
    computePasswordStrength(password: string) {
      let computedStrength = 0

      if (password.length > 7) {
        computedStrength++
      }

      if (password.match(/[a-z]/)) {
        computedStrength++
      }

      if (password.match(/[A-Z]/)) {
        computedStrength++
      }

      if (password.match(/[\s`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        computedStrength++
      }

      if (password.match(/[0-9]/)) {
        computedStrength++
      }

      set(() => ({ strength: computedStrength }))
    },
  }
}

export default createPasswordStrengthSlice
