export type NewPrinterForm = {
  printerId?: number | null
  customerName?: string | null
  product?: string | null
  option?: string | null
  kinds?: string | null
  quantity?: string | null
  runOns?: string | null
  format?: string | null
  finalTrimSize?: string | null
  reference?: string | null
  notes?: string | null
  delivery?: string | null
  price?: string | null
  blindShipping?: boolean
  resellerSamples?: boolean
  rubberBunds?: number | null
  shrinkwrapping?: number | null
  drilling?: number | null
  padding?: number | null
  perforate?: number | null
  additionalOptions?: Array<{ quantity: number | null; title: string | null }>
}
