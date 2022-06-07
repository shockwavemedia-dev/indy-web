import { array, date, mixed, number, object, SchemaOf, string } from 'yup'
import { CreateProjectBriefForm } from '../types/forms/CreateProjectBriefForm'

export const CreateProjectBriefFormSchema: SchemaOf<CreateProjectBriefForm> = object().shape({
  requestedBy: number().required(),
  clientId: number().required(),
  subject: string().required(),
  services: array()
    .of(
      object()
        .shape({
          serviceId: number().required(),
          extras: array().of(string().required()),
        })
        .required()
    )
    .min(1),
  duedate: date().required().nullable(),
  description: string().required(),
  attachments: array().of(mixed().optional()),
})
