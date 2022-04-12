import { mixed, number, object, SchemaOf, string } from 'yup'
import { NewClientUserForm } from '../interfaces/NewClientUserForm.interface'

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
  role: mixed().required().oneOf(['group_manager', 'marketing_manager', 'manager']),
  birthDate: string().required(),
})
