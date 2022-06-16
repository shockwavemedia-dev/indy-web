import { number, object, SchemaOf, string } from 'yup'
import { CreateSupportRequestForm } from '../types/forms/CreateSupportRequestForm.type'

export const CreateSupportRequestFormSchema: SchemaOf<CreateSupportRequestForm> = object().shape({
  message: string().required(),
  departmentId: number().required(),
})
