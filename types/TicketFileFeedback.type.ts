export type TicketFileFeedback = {
  id: number
  feedback: string
  clientFileId: number
  feedbackBy: string
  feedbackByType: 'adminUsers' | 'clientUsers' | 'leadClient'
  createdAt: Date
  feedbackAttachment: Array<File>
}
