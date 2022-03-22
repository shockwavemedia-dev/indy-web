import { SetState } from 'zustand'
import { StoreState } from '../types/StoreState.type'

const createPasswordStrengthSlice = (set: SetState<StoreState>) => ({
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
