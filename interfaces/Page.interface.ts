export interface Page {
  from: number
  to: number
  currentPage: number
  nextPageUrl: string
  lastPage: number
  perPage: number
  lastPageUrl: string
  firstPageUrl: string
  previousPageUrl: string
  total: number
}
