import { object, SchemaOf, string } from 'yup'
import { ForgotPasswordForm } from '../types/forms/ForgotPasswordForm.type'

export const ForgotPasswordFormSchema: SchemaOf<ForgotPasswordForm> = object().shape({
  email: string().required(),
})
