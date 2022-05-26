import { mixed, object, SchemaOf } from 'yup'
import { UploadTicketFile } from '../types/forms/UploadTicketFile.type'

export const UploadTicketFileSchema: SchemaOf<UploadTicketFile> = object().shape({
  file: mixed().required(),
})
