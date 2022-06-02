import { array, mixed, number, object, SchemaOf } from 'yup'
import { AddTicketAssigneeForm } from '../types/forms/AddTicketAssigneeForm.type'

export const AddTicketAssigneeFormSchema: SchemaOf<AddTicketAssigneeForm> = object().shape({
  adminUserId: number().required(),
  links: array().of(
    object()
      .shape({
        ticketAssigneeId: number().required(),
        issue: mixed().required().oneOf(['blocks', 'blocked by']),
      })
      .required()
  ),
})
