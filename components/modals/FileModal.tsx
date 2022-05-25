import axios from 'axios'
import { Form, Formik } from 'formik'
import Image from 'next/image'
import { useQuery, useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import DummyFile from '../../public/images/dummy-file.png'
import { CreateFileFeedbackFormSchema } from '../../schemas/CreateFileFeedbackFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { CreateFileFeedbackForm } from '../../types/forms/CreateFileFeedbackForm.type'
import { Page } from '../../types/Page.type'
import { TicketFile } from '../../types/TicketFile.type'
import { TicketFileFeedback } from '../../types/TicketFileFeedback.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { EditIcon } from '../icons/EditIcon'
import { PaperClipIcon } from '../icons/PaperClipIcon'
import { PaperPlaneIcon } from '../icons/PaperPlaneIcon'
import { Modal } from '../Modal'
import { Pill } from '../Pill'
import { RichTextInput } from '../RichTextInput'
import { TicketFileFeedbackCard } from '../TicketFileFeedbackCard'
import { TitleValue } from '../TitleValue'

export const FileModal = ({ ticketId }: { ticketId: number }) => {
  const { showToast } = useToastStore()
  const { ticketFileId, toggleFileModal } = useFileModalStore.getState()

  const queryClient = useQueryClient()

  const { data: ticketFile } = useQuery(
    ['ticketFile', ticketFileId],
    async () => {
      const { data } = await axios.get<TicketFile>(`/v1/ticket-files/${ticketFileId}`)

      return data
    },
    {
      enabled: !!ticketFileId,
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
      enabled: !!ticketFileId,
    }
  )

  const closeFileModal = () => toggleFileModal()

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
        message: 'Something went wrong 😵',
      })
    }
  }

  const approveTicketFile = async () => {
    try {
      const { status } = await axios.post(`/v1/ticket-files/${ticketFileId}/approve`)

      if (status === 200) {
        queryClient.invalidateQueries(['ticketFiles', ticketId])
        queryClient.invalidateQueries(['ticketFile', ticketFileId])
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong 😵',
      })
    }
  }

  return (
    <>
      {!!ticketFile && !!ticketFileId && (
        <Modal onClose={closeFileModal} bgColor="bg-ghost-white">
          <div className="flex w-270 space-x-6">
            <div className="space-y-6">
              <div>
                <Image
                  src={DummyFile}
                  height={512}
                  width={512}
                  alt={ticketFile.name}
                  className="rounded-xl"
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
                    pillColor={(() => {
                      switch (ticketFile.status) {
                        case 'approved':
                          return 'bg-jungle-green'
                        case 'back from review':
                          return 'bg-bleu-de-france'
                        case 'deleted':
                          return 'bg-tart-orange'
                        case 'in_progress':
                          return 'bg-jungle-green'
                        case 'for_review':
                          return 'bg-bleu-de-france'
                        case 'new':
                          return 'bg-jungle-green'
                      }
                    })()}
                    value={ticketFile.status}
                  />
                </TitleValue>
                <TitleValue title="Approval Status" className="flex items-center justify-between">
                  <Pill
                    pillColor={ticketFile.isApproved ? 'bg-jungle-green' : 'bg-tart-orange'}
                    value={ticketFile.isApproved ? 'Approved' : 'Not Approved'}
                  />
                </TitleValue>
              </div>
              {!ticketFile.isApproved && (
                <Button ariaLabel="Approve Ticket File" type="button" onClick={approveTicketFile}>
                  Approve
                </Button>
              )}
            </div>
            <div className="w-full space-y-5">
              <Formik
                validationSchema={CreateFileFeedbackFormSchema}
                initialValues={{ feedback: '', attachment: [] }}
                onSubmit={submitForm}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <RichTextInput
                      Icon={EditIcon}
                      placeholder="Enter feedback"
                      name="feedback"
                      inputActions={
                        <div className="absolute right-6 bottom-6 z-10 flex items-center space-x-6">
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
                    createdAt={createdAt ?? new Date()}
                    createdBy={feedbackBy}
                  />
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export const useFileModalStore = createStore(
  combine(
    {
      ticketFileId: -1,
    },
    (set) => ({
      toggleFileModal: (ticketFileId?: number) => set(() => ({ ticketFileId })),
    })
  )
)
