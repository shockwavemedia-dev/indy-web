import { array, date, mixed, number, object, SchemaOf, string } from 'yup'
import { NewEventForm } from '../interfaces/NewEventForm.interface'

export const NewEventFormSchema: SchemaOf<NewEventForm> = object().shape({
  requestedBy: number().required(),
  clientId: number().required(),
  subject: string().required(),
  services: array()
    .of(
      object()
        .shape({
          serviceId: number().required(),
          extras: array().of(string().required()).optional(),
        })
        .required()
    )
    .required()
    .min(1),
  duedate: date().required().nullable(),
  description: string().required(),
  attachment: mixed().required(),
})
