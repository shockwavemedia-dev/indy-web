import { Printer } from './Printer.type'

export type Client = {
  id: number
  name: string
  clientCode: string
  address: string
  phone: string
  timezone: string
  clientSince: Date
  overview: string
  rating: number
  status: 'active' | 'inactive' | 'deleted'
  designatedDesignerId?: number | null
  designatedDesigner?: string | null
  designatedWebEditorId?: number | null
  designatedWebEditor?: string | null
  designatedPrinterManagerId?: number | null
  designatedPrinterManager?: string | null
  designatedSocialMediaManagerId?: number | null
  designatedSocialMediaManager?: string | null
  designatedAnimatorId?: number | null
  designatedAnimator?: string | null

  logoUrl: string
  logoThumbnailUrl: string
  ownerId: number
  note: string
  styleGuide: string
  printer: Printer | null
  printerId: number | null
}
