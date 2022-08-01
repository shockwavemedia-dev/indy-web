import { array, date, number, object, SchemaOf, string } from 'yup'
import { CreatePhotographyVideographyForm } from '../types/forms/CreatePhotographyVideographyForm'

export const CreatePhotographyVideographyFormSchema: SchemaOf<CreatePhotographyVideographyForm> =
  object().shape({
    serviceType: string().required(),
    shootTitle: string().required(),
    shootDate: date().required().nullable(),
    eventName: string().required(),
    bookingType: string().required(),
    backdrops: string().optional().nullable(),
    contactName: string().optional().nullable(),
    contactNumber: string().optional().nullable(),
    departmentManager: string().optional().nullable(),
    jobDescription: string().optional().nullable(),
    location: string().optional().nullable(),
    numberOfDishes: string().optional().nullable(),
    outputs: array().of(string().required()).optional(),
    preferredDueDate: date().optional().nullable(),
    startTime: string().optional().nullable(),
    stylingRequired: string().optional().nullable(),
    shootType: array().of(string().required()).optional(),
    photographerId: number().optional().nullable(),
  })
