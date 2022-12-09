import axios from 'axios'
import { Form, Formik } from 'formik'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { CreateFileFeedbackFormSchema } from '../../../schemas/CreateFileFeedbackFormSchema'
import { useToastStore } from '../../../store/ToastStore'
import { CreateFileFeedbackForm } from '../../../types/forms/CreateFileFeedbackForm.type'
import { Page } from '../../../types/Page.type'
import { TicketFile } from '../../../types/TicketFile.type'
import { TicketFileFeedback } from '../../../types/TicketFileFeedback.type'
import { get422And400ResponseError } from '../../../utils/ErrorHelpers'
import { objectWithFileToFormData } from '../../../utils/FormHelpers'
import { Button } from '../../Button'
import { FileDisplay } from '../../FileDisplay'
import { DownloadIcon } from '../../icons/DownloadIcon'
import { EditIcon } from '../../icons/EditIcon'
import { PaperClipIcon } from '../../icons/PaperClipIcon'
import { PaperPlaneIcon } from '../../icons/PaperPlaneIcon'
import { Pill } from '../../Pill'
import { RichTextInput } from '../../RichTextInput'
import { TicketFileFeedbackCard } from '../../tickets/TicketFileFeedbackCard'
import { TitleValue } from '../../TitleValue'

export const AdminTicketFile = ({ ticketFileId }: { ticketFileId: number }) => {
  const { showToast } = useToastStore()
  const { setHeader } = usePanelLayoutStore()
  const queryClient = useQueryClient()

  const { data: ticketFile } = useQuery(
    ['ticketFile', ticketFileId],
    async () => {
      const { data } = await axios.get<TicketFile>(`/v1/ticket-files/${ticketFileId}`)

      return data
    },
    {
      enabled: ticketFileId !== -1,
    }
  )

  const { data: fileFeedbacks } = useQuery(
    ['fileFeedbacks', ticketFileId],
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<TicketFileFeedback>
        page: Page
      }>(`/v1/ticket-files/${ticketFileId}/feedbacks`)

      return data
    },
    {
      enabled: ticketFileId !== -1,
    }
  )

  const downloadFile = () => {
    if (!!ticketFile && ticketFile?.signedUrl !== null) {
      window.open(ticketFile.signedUrl, '_blank')
      // fetch(ticketFile.signedUrl)
      //   .then((res) => res.blob())
      //   .then((blob) => {
      //     const url = window.URL.createObjectURL(blob)
      //     const link = document.createElement('a')
      //     link.href = url
      //     link.setAttribute('download', ticketFile.name)
      //     document.body.appendChild(link)
      //     link.click()
      //   })
    }
  }

  const submitForm = async (
    values: CreateFileFeedbackForm,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const { status } = await axios.post(
        `/v1/ticket-files/${ticketFileId}/feedbacks`,
        objectWithFileToFormData(values)
      )

      if (status === 200) {
        queryClient.invalidateQueries(['fileFeedbacks', ticketFileId])
        resetForm()
        showToast({
          type: 'success',
          message: 'Feedback sent!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: get422And400ResponseError(e),
      })
    }
  }

  useEffect(() => {
    setHeader('Ticket File')
  }, [])

  return (
    <>
      {!!ticketFile && ticketFileId !== -1 && (
        <div className="mx-auto flex w-full max-w-8xl space-x-6">
          <div className="w-140 space-y-5">
            <div>
              <FileDisplay
                src={ticketFile.signedUrl}
                type={ticketFile.fileType}
                imageHeight="h-175"
                imageAlt={ticketFile.name}
                videoClassName="w-140 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <TitleValue title="ID" className="flex items-center justify-between">
                {ticketFile.id}
              </TitleValue>
              <TitleValue title="Name" className="flex items-center justify-between">
                {ticketFile.name}
              </TitleValue>
              <TitleValue title="Status" className="flex items-center justify-between">
                <Pill
                  twBackgroundColor={(() => {
                    switch (ticketFile.status) {
                      case 'approved':
                        return 'bg-honeydew'
                      case 'back from review':
                        return 'bg-alice-blue'
                      case 'deleted':
                        return 'bg-light-tart-orange'
                      case 'in progress':
                        return 'bg-honeydew'
                      case 'for review':
                        return 'bg-light-navy'
                      case 'new':
                        return 'bg-alice-blue'
                    }
                  })()}
                  twTextColor={(() => {
                    switch (ticketFile.status) {
                      case 'approved':
                        return 'text-jungle-green'
                      case 'back from review':
                        return 'text-bleu-de-france'
                      case 'deleted':
                        return 'text-tart-orange'
                      case 'in progress':
                        return 'text-jungle-green'
                      case 'for review':
                        return 'text-bleu-de-france'
                      case 'new':
                        return 'text-bleu-de-france'
                    }
                  })()}
                  value={ticketFile.status}
                />
              </TitleValue>
              <TitleValue title="Approval Status" className="flex items-center justify-between">
                <Pill
                  twBackgroundColor={ticketFile.isApproved ? 'bg-honeydew' : 'bg-light-tart-orange'}
                  twTextColor={ticketFile.isApproved ? 'text-jungle-green' : 'text-tart-orange'}
                  value={ticketFile.isApproved ? 'Approved' : 'For Approval'}
                />
              </TitleValue>
              <Button
                ariaLabel="Download"
                className="text-bleu-de-france"
                type="button"
                onClick={downloadFile}
                light
              >
                <DownloadIcon className="stroke-bleu-de-france" />
                <div>Download</div>
              </Button>
            </div>
          </div>
          <div className="flex-1 space-y-5">
            <Formik
              validationSchema={CreateFileFeedbackFormSchema}
              initialValues={{ feedback: '', attachment: [] }}
              onSubmit={submitForm}
            >
              {({ isSubmitting }) => (
                <Form>
                  <RichTextInput
                    label="Enter Feedback"
                    className="h-86"
                    Icon={EditIcon}
                    placeholder="Enter feedback"
                    name="feedback"
                    inputActions={
                      <div className="absolute right-6 bottom-6 z-10 flex items-center space-x-5">
                        <input type="file" name="attachment" id="attachment" hidden />
                        <label htmlFor="note-attachment" className="cursor-pointer">
                          <PaperClipIcon className="stroke-waterloo" />
                        </label>
                        <Button
                          ariaLabel="Submit Notes"
                          type="submit"
                          className="!w-fit px-10"
                          disabled={isSubmitting}
                        >
                          <PaperPlaneIcon className="stroke-white" />
                          <div>Send</div>
                        </Button>
                      </div>
                    }
                  />
                </Form>
              )}
            </Formik>
            <div className="max-h-130 space-y-5 overflow-y-auto">
              {fileFeedbacks?.map(({ id, feedback, createdAt, feedbackBy }) => (
                <TicketFileFeedbackCard
                  key={`ticket-file-feedback-${id}`}
                  feedback={feedback}
                  createdAt={createdAt}
                  createdBy={feedbackBy}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
