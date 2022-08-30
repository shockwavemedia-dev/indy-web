import { object, SchemaOf, string } from 'yup'
import { CreateClientNoteForm } from '../types/forms/CreateClientNoteForm.type'

export const CreateClientNoteSchema: SchemaOf<CreateClientNoteForm> = object().shape({
  note: string().required(),
})
