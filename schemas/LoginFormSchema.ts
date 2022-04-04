import { object, SchemaOf, string } from 'yup'
import { LoginForm } from '../interfaces/LoginForm.interface'

export const LoginFormSchema: SchemaOf<LoginForm> = object().shape({
  email: string().email().required(),
  password: string().required(),
})
