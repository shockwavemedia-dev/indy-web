import { mixed, object, SchemaOf } from 'yup'
import { UploadProfileForm } from '../types/forms/UploadProfileForm.type'

export const UploadProfileFormSchema: SchemaOf<UploadProfileForm> = object().shape({
  profile_photo: mixed().required(),
})
