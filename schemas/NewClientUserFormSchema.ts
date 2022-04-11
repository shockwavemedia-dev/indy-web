import { number, object, SchemaOf, string } from 'yup'
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
  gender: string().required(),
  role: string().required(),
  birthDate: string().required(),
})
