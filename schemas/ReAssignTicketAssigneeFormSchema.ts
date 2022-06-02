import { number, object, SchemaOf } from 'yup'
import { ReAssignTicketAssigneeForm } from '../types/forms/ReAssignTicketAssigneeForm.type'

export const ReAssignTicketAssigneeFormSchema: SchemaOf<ReAssignTicketAssigneeForm> =
  object().shape({
    adminUserId: number().required(),
  })
