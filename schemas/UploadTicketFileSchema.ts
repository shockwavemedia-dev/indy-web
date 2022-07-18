import { mixed, object, SchemaOf, string } from 'yup'
import { UploadTicketFile } from '../types/forms/UploadTicketFile.type'

export const UploadTicketFileSchema: SchemaOf<UploadTicketFile> = object().shape({
  file: mixed().required(),
  folderId: string().required(),
})
