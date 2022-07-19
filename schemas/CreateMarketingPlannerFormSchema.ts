import { array, boolean, date, mixed, object, SchemaOf, string } from 'yup'
import { CreateMarketingPlannerForm } from '../types/forms/CreateMarketingPlannerForm'

export const CreateMarketingPlannerFormSchema: SchemaOf<CreateMarketingPlannerForm> =
  object().shape({
    eventName: string().required(),
    description: string().required(),
    startDate: date().required(),
    taskManagement: array().of(string().required()).optional(),
    todoList: array().of(string().required()).optional(),
    endDate: date().required(),
    isRecurring: boolean().required(),
    attachments: array().of(mixed().optional()),
  })
