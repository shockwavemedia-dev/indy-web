import { boolean, mixed, number, object, SchemaOf, string } from 'yup'
import { NewClientUserForm } from '../types/forms/NewClientUserForm.type'

export const NewClientUserFormSchema: SchemaOf<NewClientUserForm> = object().shape({
  clientId: number().required(),
  email: string().email().required(),
  sendInvite: boolean().required(),
  password: string().when('sendInvite', {
    is: true,
    then: string().optional(),
    otherwise: string().required(),
  }),
  passwordConfirmation: string().when('sendInvite', {
    is: true,
    then: string().optional(),
    otherwise: string().required(),
  }),
  contactNumber: string().optional(),
  firstName: string().required(),
  lastName: string().optional(),
  role: mixed().required().oneOf(['group manager', 'marketing manager', 'marketing']),
})
