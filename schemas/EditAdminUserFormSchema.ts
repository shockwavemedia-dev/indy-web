import { mixed, number, object, SchemaOf, string } from 'yup'
import { EditAdminUserForm } from '../types/forms/EditAdminUserForm.type'

export const EditAdminUserFormSchema: SchemaOf<EditAdminUserForm> = object().shape({
  contactNumber: string().optional().nullable(),
  firstName: string().required(),
  position: string().required(),
  lastName: string().optional().nullable(),
  role: mixed().required().oneOf(['admin', 'account manager', 'manager', 'staff']),
  status: mixed()
    .required()
    .oneOf(['active', 'inactive', 'guest', 'not_verified', 'revoked', 'deleted']),
  departmentId: number().optional().nullable(),
  id: number().optional(),
})
