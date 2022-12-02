import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { RequestRevisionTicketFileFormSchema } from '../../schemas/RequestRevisionTicketFileFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { RequestRevisionTicketFileForm } from '../../types/forms/RequestRevisionTicketFileForm.type'
import { TicketFile } from '../../types/TicketFile.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { Button } from '../Button'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { RichTextInput } from '../RichTextInput'

export const useRevisionRequestRevisionTicketFileModal = createStore(
  combine(
    {
      ticketFile: undefined as TicketFile | undefined,
    },
    (set) => ({
      toggleModal: (ticketFile?: TicketFile) => set({ ticketFile }),
    })
  )
)

export const RequestRevisionTicketFileModal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { ticketFile, toggleModal } = useRevisionRequestRevisionTicketFileModal()

  const submitForm = async (values: RequestRevisionTicketFileForm) => {
    try {
      const { status } = await axios.post(
        `/v1/ticket-files/${ticketFile?.id}/request-revision`,
        values
      )

      if (status === 200) {
        queryClient.invalidateQueries(['ticketFile', ticketFile?.id])
        queryClient.invalidateQueries(['ticketFiles'])
        toggleModal()
        showToast({
          type: 'success',
          message: 'Request Revision and feedback sent',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: get422And400ResponseError(e),
      })
    }
  }

  return (
    <>
      {ticketFile && (
        <Modal
          title="Request Edit"
          onClose={toggleModal}
          className="w-155 border-2 border-solid border-bright-gray"
        >
          <Formik
            validationSchema={RequestRevisionTicketFileFormSchema}
            initialValues={{
              message: '',
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex h-102 w-140 flex-col">
                <RichTextInput
                  label="Tell us about your request for revisions"
                  Icon={EditIcon}
                  placeholder="Enter feedback details"
                  name="message"
                  className="mb-5 h-86"
                />

                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={() => toggleModal()} type="button" light>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                    Submit Feedback
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  )
}
