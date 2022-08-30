import { array, mixed, object, SchemaOf, string } from 'yup'
import { AddServiceExtraForm } from '../types/forms/AddServiceExtraForm.type'

export const AddServiceExtraFormSchema: SchemaOf<AddServiceExtraForm> = object().shape({
  extra: string().required(),
  extras: array().of(mixed().optional()),
})
