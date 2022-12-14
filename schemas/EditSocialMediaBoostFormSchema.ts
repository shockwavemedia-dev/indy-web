import { array, number, object, SchemaOf, string } from 'yup'
import { EditSocialMediaBoostForm } from '../types/forms/EditSocialMediaBoostForm.type'

export const EditSocialMediaBoostFormScheme: SchemaOf<EditSocialMediaBoostForm> = object().shape({
  socialMediaId: number().required(),
  extras: array().of(
    object().shape({
      name: string().optional().nullable(),
      hasValue: number().nullable().optional(),
      quantity: number().when('hasValue', {
        is: (hasValue: number) => hasValue > 0,
        then: number().required().min(50, 'Minimum cost for boost is 50'),
        otherwise: number().optional().nullable(),
      }),
    })
  ),
})
