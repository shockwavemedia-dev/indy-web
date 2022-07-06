import { array, number, object, SchemaOf, string } from 'yup'
import { EditDepartmentForm } from '../types/forms/EditDepartmentForm.type'

export const EditDepartmentFormSchema: SchemaOf<EditDepartmentForm> = object().shape({
  description: string().optional(),
  minDeliveryDays: number().optional(),
  services: array().of(number().required()).min(1),
})
