import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '..'

interface PasswordStrength {
  value: number
}

const initialState: PasswordStrength = {
  value: 0,
}

const passwordStrengthSlice = createSlice({
  name: 'passwordStrength',
  initialState,
  reducers: {
    compute(state, action: PayloadAction<string>) {
      let strength = 0

      if (action.payload.length > 7) {
        strength++
      }

      if (action.payload.match(/[a-z]/)) {
        strength++
      }

      if (action.payload.match(/[A-Z]/)) {
        strength++
      }

      if (action.payload.match(/[\s`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        strength++
      }

      if (action.payload.match(/[0-9]/)) {
        strength++
      }

      state.value = strength
    },
  },
})

export const passwordStrength = (state: AppState) => state.passwordStrength.value

export const {
  actions: { compute },
  reducer: passwordStrengthReducer,
} = passwordStrengthSlice
