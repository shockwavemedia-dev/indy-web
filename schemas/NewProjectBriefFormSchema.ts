import { array, date, mixed, number, object, SchemaOf, string } from 'yup'
import { NewProjectBriefForm } from '../types/NewProjectBriefForm.type'

export const NewProjectBriefFormSchema: SchemaOf<NewProjectBriefForm> = object().shape({
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
  date: date().required().nullable(),
  briefName: string().required(),
  content: string().required(),
  assets: mixed().required(),
})
