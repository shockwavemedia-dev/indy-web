import { array, mixed, object, SchemaOf } from 'yup'
import { UploadFileModalForm } from '../types/forms/UploadFileModalForm.type'

export const UploadFileModalFormSchema: SchemaOf<UploadFileModalForm> = object().shape({
  files: array().of(mixed().optional()).required().min(1),
})
