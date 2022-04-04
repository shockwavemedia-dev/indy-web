export interface PasswordResetForm {
  password: string
  passwordConfirmation: string
  token?: string
  email?: string
}
