import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { UploadTicketFileSchema } from '../../schemas/UploadTicketFileSchema'
import { useToastStore } from '../../store/ToastStore'
import { UploadTicketFile } from '../../types/forms/UploadTicketFile.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { FileDropZone } from '../FileDropZone'
import { FolderSelect } from '../FolderSelect'
import { Modal } from '../Modal'

export const UploadTicketFileModal = ({
  ticketId,
  clientId,
}: {
  ticketId: number
  clientId: number
}) => {
  const { isUploadTicketFileModalVisible, toggleUploadTicketFileModal } =
    useUploadTicketFileModalStore()
  const { showToast } = useToastStore()
  const queryClient = useQueryClient()

  const submitTicketFile = async (values: UploadTicketFile) => {
    try {
      const { status } = await axios.post(
        `/v1/tickets/${ticketId}/upload-file`,
        objectWithFileToFormData(values)
      )

      if (status === 200) {
        queryClient.invalidateQueries(['ticketFiles', ticketId])
        toggleUploadTicketFileModal()
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
      {isUploadTicketFileModalVisible && (
        <Modal title="Upload Ticket File" onClose={toggleUploadTicketFileModal}>
          <Formik
            validationSchema={UploadTicketFileSchema}
            initialValues={{ file: null, folderId: '' }}
            onSubmit={submitTicketFile}
          >
            {({ isSubmitting }) => (
              <Form className="w-130 space-y-8">
                <div className="space-y-5">
                  <FileDropZone
                    name="file"
                    maxSize={250}
                    mimeType="image/gif"
                    accept={['.gif', '.Graphics', '.mp4', '.png', '.jpeg', '.jpg']}
                  />
                  <FolderSelect clientId={clientId} />
                </div>
                <div className="flex space-x-5">
                  <Button
                    ariaLabel="Cancel"
                    onClick={toggleUploadTicketFileModal}
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

export const useUploadTicketFileModalStore = createStore(
  combine(
    {
      isUploadTicketFileModalVisible: false,
    },
    (set, get) => ({
      toggleUploadTicketFileModal: () =>
        set(() => ({ isUploadTicketFileModalVisible: !get().isUploadTicketFileModalVisible })),
    })
  )
)
