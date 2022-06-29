import { array, number, object, SchemaOf } from 'yup'
import { AddDepartmentMembersForm } from '../types/forms/AddDepartmentMembersForm.type'

export const AddDepartmentMembersFormSchema: SchemaOf<AddDepartmentMembersForm> = object().shape({
  adminUsers: array().of(number().required()).min(1),
})
