import { boolean, mixed, number, object, SchemaOf, string } from 'yup'
import { NewAdminUserForm } from '../types/forms/NewAdminUserForm.type'

export const NewAdminUserFormSchema: SchemaOf<NewAdminUserForm> = object().shape({
  email: string().email().required(),
  sendInvite: boolean().required(),
  password: string()
    .when('sendInvite', {
      is: true,
      then: string().optional(),
      otherwise: string().required(),
    })
    .min(6),
  passwordConfirmation: string()
    .when('sendInvite', {
      is: true,
      then: string().optional(),
      otherwise: string().required(),
    })
    .min(6),
  contactNumber: string().optional(),
  firstName: string().required(),
  position: string().required(),
  lastName: string().optional(),
  role: mixed().required().oneOf(['admin', 'account manager', 'manager', 'staff']),
  departmentId: number().optional().nullable(),
})
