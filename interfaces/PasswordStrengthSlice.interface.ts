export interface PasswordStrengthSlice {
  passwordStrength: number
  computePasswordStrength: (password: string) => void
}
