export type PhotographyVideography = {
  id: number
  backdrops?: string | null
  bookingType: string
  contactName?: string | null
  contactNumber?: string | null
  departmentManager?: number | null
  eventName?: string | null
  jobDescription?: string | null
  location?: string | null
  numberOfDishes?: string | null
  outputs?: Array<string>
  preferredDueDate: Date
  serviceType: string
  shootDate: Date
  shootTitle?: string | null
  startTime?: string | null
  stylingRequired?: string | null
  shootType?: Array<string>
}
