import { object, SchemaOf, string } from 'yup'
import { CreateNoteForm } from '../types/forms/CreateNoteForm.type'
import { richTextEmptyCheck } from '../utils/FormHelpers'

export const CreateNoteFormSchema: SchemaOf<CreateNoteForm> = object().shape({
  note: string()
    .required()
    .test('draft-js-empty-check', 'Note is a required field', richTextEmptyCheck),
})
