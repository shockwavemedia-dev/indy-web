import { array, mixed, number, object, SchemaOf } from 'yup'
import { EditSocialMediaBoostForm } from '../types/forms/EditSocialMediaBoostForm.type'

export const EditSocialMediaBoostFormScheme: SchemaOf<EditSocialMediaBoostForm> = object().shape({
  socialMediaId: number().required(),
  extras: array().of(mixed().optional()),
})
