export type EditPhotographyVideographyForm = {
  serviceType: string
  shootTitle: string
  shootDate: Date | null
  eventName: string
  bookingType: string
  outputs?: Array<string>
  backdrops?: string | null
  contactName?: string | null
  contactNumber?: string | null
  departmentManager?: string | null
  jobDescription?: string | null
  location?: string | null
  numberOfDishes?: string | null
  preferredDueDate?: Date | null
  startTime?: string | null
  stylingRequired?: string | null
  shootType?: Array<string>
}
