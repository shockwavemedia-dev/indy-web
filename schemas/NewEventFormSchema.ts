import { array, date, mixed, number, object, SchemaOf, string } from 'yup'
import { CreateEventForm } from '../types/forms/CreateEventFormSchema.type'

export const CreateEventFormSchema: SchemaOf<CreateEventForm> = object().shape({
  requestedBy: number().required(),
  clientId: number().required(),
  subject: string().required(),
  services: array()
    .of(
      object()
        .shape({
          serviceId: number(),
          extras: array().of(string()),
        })
        .required()
    )
    .min(1),
  duedate: date().required().nullable(),
  description: string().required(),
  attachment: mixed().optional(),
})
