import { object, SchemaOf, string } from 'yup'
import { UserPasswordForm } from '../types/forms/UserPasswordForm.type'

export const NewUserSetPasswordFormSchema: SchemaOf<UserPasswordForm> = object().shape({
  email: string().email(),
  password: string().required(),
  token: string(),
  passwordConfirmation: string().required(),
})
