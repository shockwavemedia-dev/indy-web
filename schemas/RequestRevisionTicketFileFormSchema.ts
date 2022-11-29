import { object, SchemaOf, string } from 'yup'
import { RequestRevisionTicketFileForm } from '../types/forms/RequestRevisionTicketFileForm.type'

export const RequestRevisionTicketFileFormSchema: SchemaOf<RequestRevisionTicketFileForm> =
  object().shape({
    message: string().nullable().optional(),
  })
