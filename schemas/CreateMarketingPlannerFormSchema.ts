import { array, boolean, date, mixed, number, object, SchemaOf, string } from 'yup'
import { CreateMarketingPlannerForm } from '../types/forms/CreateMarketingPlannerForm.type'

export const CreateMarketingPlannerFormSchema: SchemaOf<CreateMarketingPlannerForm> =
  object().shape({
    eventName: string().required(),
    description: string().required(),
    startDate: date().required(),
    todoList: array()
      .of(
        object().shape({
          id: number(),
          name: string().required(),
          status: mixed().oneOf(['to-do', 'in-progress', 'completed']),
          assignees: array().of(number()).optional(),
          deadline: date(),
          notify: boolean().required(),
          custom: boolean().required(),
          selected: boolean().required(),
        })
      )
      .required(),
    endDate: date().required(),
    isRecurring: boolean().required(),
    attachments: array().of(mixed().optional()),
  })
