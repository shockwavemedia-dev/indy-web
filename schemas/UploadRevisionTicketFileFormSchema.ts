import { mixed, object, SchemaOf } from 'yup'
import { UploadRevisionTicketFileForm } from '../types/forms/UploadRevisionTicketFileForm.type'

export const UploadRevisionTicketFileFormSchema: SchemaOf<UploadRevisionTicketFileForm> =
  object().shape({
    file: mixed().required(),
  })
