import { array, number, object, SchemaOf, string } from 'yup'
import { NewDepartmentForm } from '../types/forms/NewDepartmentForm.type'

export const NewDepartmentFormSchema: SchemaOf<NewDepartmentForm> = object().shape({
  name: string().required(),
  description: string().optional(),
  minDeliveryDays: number().optional(),
  services: array().of(number().required()).min(1),
})
