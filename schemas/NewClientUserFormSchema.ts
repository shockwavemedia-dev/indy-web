import { date, mixed, number, object, SchemaOf, string } from 'yup'
import { NewClientUserForm } from '../types/forms/NewClientUserForm.type'

export const NewClientUserFormSchema: SchemaOf<NewClientUserForm> = object().shape({
  clientId: number().required(),
  email: string().email().required(),
  password: string().required(),
  passwordConfirmation: string().required(),
  contactNumber: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  middleName: string().optional(),
  gender: mixed().required().oneOf(['female', 'male']),
  role: mixed().required().oneOf(['group manager', 'marketing manager', 'manager']),
  birthDate: date().required(),
})
