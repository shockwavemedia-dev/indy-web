import { date, number, object, SchemaOf, string } from 'yup'
import { CreateSupportRequestForm } from '../types/forms/CreateSupportRequestForm.type'

export const CreateSupportRequestFormSchema: SchemaOf<CreateSupportRequestForm> = object().shape({
  subject: string().required(),
  description: string().required(),
  type: string().required(),
  requestedBy: number().required(),
  clientId: number().required(),
  departmentId: number().required(),
  duedate: date().required().nullable(),
})
