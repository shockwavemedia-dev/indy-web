import { mixed, number, object, SchemaOf, string } from 'yup'
import { NewClientUserForm } from '../types/forms/NewClientUserForm.type'

export const NewClientUserFormSchema: SchemaOf<NewClientUserForm> = object().shape({
  clientId: number().required(),
  email: string().email().required(),
  password: string().required(),
  passwordConfirmation: string().required(),
  contactNumber: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  role: mixed().required().oneOf(['group manager', 'marketing manager', 'marketing']),
})
