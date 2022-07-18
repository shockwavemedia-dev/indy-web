import { object, SchemaOf, string } from 'yup'
import { RenameFolderForm } from '../types/forms/RenameFolderForm.type'

export const RenameFolderFormSchema: SchemaOf<RenameFolderForm> = object().shape({
  name: string().required(),
})
