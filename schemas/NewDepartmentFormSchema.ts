import { number, object, SchemaOf, string } from 'yup'
import { NewDepartmentForm } from '../interfaces/NewDepartmentForm.interface'

export const NewDepartmentFormSchema: SchemaOf<NewDepartmentForm> = object().shape({
  name: string().required(),
  description: string().optional(),
  minDeliveryDays: number().optional(),
})
