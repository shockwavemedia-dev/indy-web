import { mixed, object, SchemaOf, string } from 'yup'
import { EditTicketForm } from '../types/forms/EditTicketForm.type'

export const EditTicketFormSchema: SchemaOf<EditTicketForm> = object().shape({
  subject: string().required(),
  description: string().required(),
  priority: mixed().required().oneOf(['Urgent', 'Standard', 'Relaxed']),
  status: mixed().required().oneOf(['closed', 'new', 'pending', 'in_progress', 'open']),
  type: mixed()
    .required()
    .oneOf(['email', 'event', 'project', 'graphic', 'print', 'task', 'library']),
})
