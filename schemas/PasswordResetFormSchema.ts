import { object, SchemaOf, string } from 'yup'
import { PasswordResetForm } from '../types/forms/PasswordResetForm.type'

export const PasswordResetFormSchema: SchemaOf<PasswordResetForm> = object().shape({
  password: string().required(),
  passwordConfirmation: string().required(),
  token: string().required(),
  email: string().email().required(),
})
