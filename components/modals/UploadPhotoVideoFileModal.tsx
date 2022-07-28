import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { useToastStore } from '../../store/ToastStore'
import { UploadPhotoVideoFile } from '../../types/forms/UploadPhotoVideoFile.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { FileDropZone } from '../FileDropZone'
import { Modal } from '../Modal'

export const UploadPhotoVideoFileModal = ({ bookingId }: { bookingId: number }) => {
  const { isUploadPhotoVideoFileModalVisible, toggleUploadPhotoVideoFileModal } =
    useUploadPhotoVideoFileModalStore()
  const { showToast } = useToastStore()
  const queryClient = useQueryClient()

  const submitPhotoVideoFile = async (values: UploadPhotoVideoFile) => {
    alert('pasok')
    try {
      alert(bookingId)
      console.log('pasok')
      console.log(values)
      const { status } = await axios.post(
        `/v1/event-bookings/${bookingId}/upload-files`,
        objectWithFileToFormData(values)
      )

      if (status === 200) {
        console.log('pasok')
        queryClient.invalidateQueries('eventBookings')
        toggleUploadPhotoVideoFileModal()
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong! 😵',
      })
    }
  }

  return (
    <>
      {isUploadPhotoVideoFileModalVisible && (
        <Modal title="Photography/Videography" onClose={toggleUploadPhotoVideoFileModal}>
          <Formik initialValues={{ files: [] }} onSubmit={submitPhotoVideoFile}>
            {({ isSubmitting }) => (
              <Form className="w-130 space-y-8">
                <div className="space-y-5">
                  <FileDropZone
                    name="file"
                    maxSize={250}
                    mimeType="image/gif"
                    accept={['.gif', '.Graphics', '.mp4', '.png', '.jpeg', '.jpg']}
                    multiple
                  />
                </div>
                <div className="flex space-x-5">
                  <Button
                    ariaLabel="Cancel"
                    onClick={toggleUploadPhotoVideoFileModal}
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

export const useUploadPhotoVideoFileModalStore = createStore(
  combine(
    {
      isUploadPhotoVideoFileModalVisible: false,
    },
    (set, get) => ({
      toggleUploadPhotoVideoFileModal: () =>
        set(() => ({
          isUploadPhotoVideoFileModalVisible: !get().isUploadPhotoVideoFileModalVisible,
        })),
    })
  )
)
