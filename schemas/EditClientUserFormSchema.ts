import { number, object, SchemaOf, string } from 'yup'
import { EditClientUserForm } from '../types/forms/EditClientUserForm.type'

export const EditClientUserFormSchema: SchemaOf<EditClientUserForm> = object().shape({
  clientId: number().required(),
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
  password: string().required(),
})
