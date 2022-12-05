import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import create from 'zustand'
import { combine } from 'zustand/middleware'
import { UploadRevisionTicketFileFormSchema } from '../../schemas/UploadRevisionTicketFileFormSchema'
import { UploadRevisionTicketFileForm } from '../../types/forms/UploadRevisionTicketFileForm.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { FileDropZone } from '../FileDropZone'
import { Modal } from '../Modal'

export const useTicketFileUploadRevisionModal = create(
  combine(
    {
      ticketFileId: -1,
    },
    (set) => ({
      toggleTicketFileUploadRevisionModal: (ticketFileId: number = -1) => set({ ticketFileId }),
    })
  )
)

export const TicketFileUploadRevisionModal = () => {
  const queryClient = useQueryClient()
  const { ticketFileId, toggleTicketFileUploadRevisionModal } = useTicketFileUploadRevisionModal()

  const uploadFile = async (values: UploadRevisionTicketFileForm) => {
    const { status } = await axios.post(
      `/v1/ticket-files/${ticketFileId}/upload-new-version`,
      objectWithFileToFormData(values)
    )

    if (status === 200) {
      toggleTicketFileUploadRevisionModal()
      queryClient.invalidateQueries('ticketFiles')
    }
  }

  return (
    <>
      {ticketFileId > 0 && (
        <Modal title="Upload new version" onClose={toggleTicketFileUploadRevisionModal}>
          <Formik<UploadRevisionTicketFileForm>
            validationSchema={UploadRevisionTicketFileFormSchema}
            initialValues={{
              file: null,
            }}
            onSubmit={uploadFile}
          >
            {({ isSubmitting }) => (
              <Form className="w-140">
                <FileDropZone
                  name="file"
                  maxSize={250}
                  mimeType="image/gif"
                  accept={['.gif', '.jpeg', '.mp4', '.png', '.pdf', '.jpg']}
                  className="mb-5"
                />
                <div className="flex space-x-5">
                  <Button
                    ariaLabel="Cancel"
                    onClick={toggleTicketFileUploadRevisionModal}
                    type="button"
                    light
                  >
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                    Submit
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
