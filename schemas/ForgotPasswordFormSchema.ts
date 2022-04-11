import { object, SchemaOf, string } from 'yup'
import { ForgotPasswordForm } from '../types/ForgotPasswordForm.type'

export const ForgotPasswordFormSchema: SchemaOf<ForgotPasswordForm> = object().shape({
  email: string().required(),
})
