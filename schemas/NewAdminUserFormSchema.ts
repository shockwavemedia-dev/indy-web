import { object, SchemaOf, string } from 'yup'
import { NewAdminUserForm } from '../interfaces/NewAdminUserForm.interface'

export const NewAdminUserFormSchema: SchemaOf<NewAdminUserForm> = object().shape({
  email: string().email().required(),
  password: string().required(),
  passwordConfirmation: string().required(),
  contactNumber: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  middleName: string().optional(),
  gender: string().required(),
  role: string().required(),
  birthDate: string().required(),
})
