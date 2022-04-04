import { object, SchemaOf, string } from 'yup'
import { ForgotPasswordForm } from '../interfaces/ForgotPasswordForm.interface'

export const ForgotPasswordFormSchema: SchemaOf<ForgotPasswordForm> = object().shape({
  email: string().required(),
})
