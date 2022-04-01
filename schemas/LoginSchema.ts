import { object, SchemaOf, string } from 'yup'

export type LoginSchemaInterface = {
  email: string
  password: string
}

export const LoginSchema: SchemaOf<LoginSchemaInterface> = object().shape({
  email: string().email().required(),
  password: string().required(),
})
