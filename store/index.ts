import { configureStore } from '@reduxjs/toolkit'
import { passwordStrengthReducer } from './slices/PasswordStrength.slice'

export const store = configureStore({
  reducer: {
    passwordStrength: passwordStrengthReducer,
  },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
