import { date, mixed, object, SchemaOf, string } from 'yup'
import { NewAdminUserForm } from '../types/forms/NewAdminUserForm.type'

export const NewAdminUserFormSchema: SchemaOf<NewAdminUserForm> = object().shape({
  email: string().email().required(),
  password: string().required(),
  passwordConfirmation: string().required(),
  contactNumber: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  middleName: string().optional().nullable(),
  gender: mixed().required().oneOf(['female', 'male']),
  role: mixed().required().oneOf(['admin', 'account manager', 'manager', 'staff']),
  birthDate: date().required(),
})
