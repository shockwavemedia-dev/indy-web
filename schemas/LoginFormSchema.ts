import { object, SchemaOf, string } from 'yup'
import { LoginForm } from '../types/forms/LoginForm.type'

export const LoginFormSchema: SchemaOf<LoginForm> = object().shape({
  email: string().required(),
  password: string().required(),
})
