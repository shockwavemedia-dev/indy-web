import { number, object, SchemaOf, string } from 'yup'
import { CreateFolderForm } from '../types/forms/CreateFolderForm.type'

export const CreateFolderFormSchema: SchemaOf<CreateFolderForm> = object().shape({
  name: string().required(),
  parentFolderId: number().optional().nullable(),
})
