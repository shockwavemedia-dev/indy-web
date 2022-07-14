import { object, SchemaOf, string } from 'yup'
import { FileFolderRenameForm } from '../types/forms/FileFolderRenameForm.type'

export const FileFolderRenameFormSchema: SchemaOf<FileFolderRenameForm> = object().shape({
  name: string().required(),
})
