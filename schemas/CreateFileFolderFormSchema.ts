import { number, object, SchemaOf, string } from 'yup'
import { CreateFileFolderForm } from '../types/forms/CreateFileFolderForm.type'

export const CreateFileFolderFormSchema: SchemaOf<CreateFileFolderForm> = object().shape({
  name: string().required(),
  parentFolderId: number().optional().nullable(),
})
