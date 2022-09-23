import { mixed, number, object, SchemaOf, string } from 'yup'
import { NewClientUserForm } from '../types/forms/NewClientUserForm.type'

export const NewClientUserFormSchema: SchemaOf<NewClientUserForm> = object().shape({
  clientId: number().required(),
  email: string().email().required(),
  password: string().required(),
  passwordConfirmation: string().required(),
  contactNumber: string().optional(),
  firstName: string().required(),
  lastName: string().optional(),
  role: mixed().required().oneOf(['group manager', 'marketing manager', 'marketing']),
})
