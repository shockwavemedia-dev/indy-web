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
  additionalOptions?: string | null
  delivery?: string | null
  price?: string | null
  blindShipping?: boolean
  resellerSamples?: boolean
}
