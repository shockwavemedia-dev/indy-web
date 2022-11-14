import { number, object, SchemaOf, string } from 'yup'
import { EditClientUserForm } from '../types/forms/EditClientUserForm.type'

export const EditClientUserFormSchema: SchemaOf<EditClientUserForm> = object().shape({
  clientId: number().required(),
  role: string().required(),
  firstName: string().required(),
  lastName: string().optional().nullable(),
  email: string().email().required(),
  password: string().optional().nullable(),
})
