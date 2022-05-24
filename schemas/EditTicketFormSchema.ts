import { date, mixed, object, SchemaOf, string } from 'yup'
import { EditTicketForm } from '../types/forms/EditTicketForm.type'

export const EditTicketFormSchema: SchemaOf<EditTicketForm> = object().shape({
  subject: string().required(),
  description: string().required(),
  duedate: date().required().nullable(),
  status: mixed()
    .required()
    .oneOf(['closed', 'new', 'pending', 'on hold', 'open', 'resolved', 'deleted']),
  type: mixed().required().oneOf(['email', 'event', 'graphic', 'print', 'task']),
})
