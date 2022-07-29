import { TicketFile } from '../TicketFile.type'
import { CreateMarketingPlannerForm } from './CreateMarketingPlannerForm.type'

export type UpdateMarketingPlannerForm = Omit<CreateMarketingPlannerForm, 'attachments'> & {
  attachments: Array<TicketFile>
}
