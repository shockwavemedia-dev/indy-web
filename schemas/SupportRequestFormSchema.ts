import { date, number, object, SchemaOf, string } from 'yup'
import { SupportRequestForm } from '../interfaces/SupportRequestForm.interface'

export const SupportRequestFormSchema: SchemaOf<SupportRequestForm> = object().shape({
  subject: string().required(),
  description: string().required(),
  type: string().required(),
  requestedBy: number().required(),
  clientId: number().required(),
  departmentId: number().required(),
  duedate: date().required().nullable(),
})
