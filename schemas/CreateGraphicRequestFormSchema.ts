import { array, date, mixed, number, object, SchemaOf, string } from 'yup'
import { CreateGraphicRequestForm } from '../types/forms/CreateGraphicRequestForm.type'

export const CreateGraphicRequestFormSchema: SchemaOf<CreateGraphicRequestForm> = object().shape({
  requestedBy: number().required(),
  clientId: number().required(),
  subject: string().required(),
  extras: array().of(string().required()),
  duedate: date().required().nullable(),
  description: string().required(),
  attachments: mixed().required(),
})
