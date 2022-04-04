import { object, SchemaOf, string } from 'yup'
import { SignUpForm } from '../interfaces/SignUpForm.interface'

export const SignUpFormSchema: SchemaOf<SignUpForm> = object().shape({
  fullName: string().required(),
  companyName: string().required(),
  email: string().email().required(),
  password: string().required(),
  passwordConfirmation: string().required(),
})
