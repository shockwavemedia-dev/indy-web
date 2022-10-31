import { date, mixed, number, object, SchemaOf, string } from 'yup'
import { EditAdminUserForm } from '../types/forms/EditAdminUserForm.type'

export const EditAdminUserFormSchema: SchemaOf<EditAdminUserForm> = object().shape({
  contactNumber: string().required(),
  firstName: string().required(),
  position: string().required(),
  lastName: string().required(),
  middleName: string().optional().nullable(),
  gender: mixed().required().oneOf(['female', 'male']),
  role: mixed().required().oneOf(['admin', 'account manager', 'manager', 'staff']),
  birthDate: date().required(),
  status: mixed()
    .required()
    .oneOf(['active', 'inactive', 'guest', 'not_verified', 'revoked', 'deleted']),
  departmentId: number().optional().nullable(),
  id: number().optional(),
})
