import { array, mixed, object, SchemaOf, string } from 'yup'
import { UploadTicketFile } from '../types/forms/UploadTicketFile.type'

export const UploadTicketFileSchema: SchemaOf<UploadTicketFile> = object().shape({
  file: array().of(mixed().optional()).min(1),
  folderId: string().required(),
})
