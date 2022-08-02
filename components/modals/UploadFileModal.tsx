import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQueryClient } from 'react-query'
import create from 'zustand'
import { combine } from 'zustand/middleware'
import { UploadFileModalFormSchema } from '../../schemas/UploadFileModalFormSchema'
import { UploadFileModalForm } from '../../types/forms/UploadFileModalForm.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { FileDropZone } from '../FileDropZone'
import { Modal } from '../Modal'

export const useUploadFileModal = create(
  combine(
    {
      folderId: -1,
    },
    (set) => ({
      toggleUploadFileModal: (folderId: number = -1) => set({ folderId }),
    })
  )
)

export const UploadFileModal = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const { folderId, toggleUploadFileModal } = useUploadFileModal()

  const uploadFile = async (values: UploadFileModalForm) => {
    const { status } = await axios.post(
      `/v1/folders/${folderId}/upload-files`,
      objectWithFileToFormData(values)
    )

    if (status === 200) {
      toggleUploadFileModal()
      queryClient.invalidateQueries(['clientFiles', session?.user.userType.clientId])
    }
  }

  return (
    <>
      {folderId > 0 && (
        <Modal title="Upload Files" onClose={toggleUploadFileModal}>
          <Formik<UploadFileModalForm>
            validationSchema={UploadFileModalFormSchema}
            initialValues={{
              files: [],
            }}
            onSubmit={uploadFile}
          >
            {({ isSubmitting }) => (
              <Form className="w-140">
                <FileDropZone
                  name="files"
                  maxSize={250}
                  mimeType="image/gif"
                  accept={['.gif', '.jpeg', '.mp4', '.png']}
                  multiple
                  className="mb-5"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={toggleUploadFileModal} type="button" light>
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
