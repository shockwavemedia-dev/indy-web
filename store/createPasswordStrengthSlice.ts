import { SetState } from 'zustand'
import { State } from './store'

export interface PasswordStrengthSlice {
  passwordStrength: number
  computePasswordStrength: (password: string) => void
}

const createPasswordStrengthSlice = (set: SetState<State>) => ({
  passwordStrength: 0,
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
})

export default createPasswordStrengthSlice
