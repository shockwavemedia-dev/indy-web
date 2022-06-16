import { date, number, object, SchemaOf, string } from 'yup'
import { CreateSupportTicketForm } from '../types/forms/CreateSupportTicketForm.type'

export const CreateSupportTicketFormSchema: SchemaOf<CreateSupportTicketForm> = object().shape({
  subject: string().required(),
  description: string().required(),
  type: string().required(),
  requestedBy: number().required(),
  clientId: number().required(),
  departmentId: number().required(),
  duedate: date().required().nullable(),
})
