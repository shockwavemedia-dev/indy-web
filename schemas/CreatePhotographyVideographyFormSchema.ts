import { array, date, number, object, SchemaOf, string } from 'yup'
import { CreatePhotographyVideographyForm } from '../types/forms/CreatePhotographyVideographyForm'

export const CreatePhotographyVideographyFormSchema: SchemaOf<CreatePhotographyVideographyForm> =
  object().shape({
    backdrops: string().optional().nullable(),
    bookingType: string().optional().nullable(),
    contactName: string().optional().nullable(),
    contactNumber: string().optional().nullable(),
    departmentManager: number().optional().nullable(),
    eventName: string().optional().nullable(),
    jobDescription: string().optional().nullable(),
    location: string().optional().nullable(),
    numberOfDishes: string().optional().nullable(),
    outputs: array().of(string().required()).optional(),
    preferredDueDate: date().optional().nullable(),
    serviceType: string().optional().nullable(),
    shootDate: date().optional().nullable(),
    shootTitle: string().optional().nullable(),
    startTime: date().optional().nullable(),
    stylingRequired: string().optional().nullable(),
    shootType: array().of(string().required()).optional(),
  })
