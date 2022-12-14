import { Client } from './Client.type'
import { Printer } from './Printer.type'
import { PrinterFile } from './PrinterFile.type'
import { PrinterJobStatus } from './PrinterJobStatus.type'

export type PrinterJob = {
  id: number
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
  blindShipping: boolean
  resellerSamples: boolean
  rubberBunds?: number | null
  shrinkwrapping?: number | null
  drilling?: number | null
  padding?: number | null
  perforate?: number | null
  additionalOptions?: Array<{ quantity: number | null; title: string | null }>
  printer: Printer
  client: Client
  status: PrinterJobStatus
  description?: string | null
  isApproved?: number | null
  stocks?: string | null
  coding?: string | null
  address?: string | null
  purchaseOrderNumber?: string | null
  attachments: Array<PrinterFile>
}
