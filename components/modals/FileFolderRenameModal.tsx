import axios, { AxiosError } from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { FileFolderRenameFormSchema } from '../../schemas/FileFolderRenameFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { FileFolderRenameForm } from '../../types/forms/FileFolderRenameForm.type'
import { Button } from '../Button'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { TextInput } from '../TextInput'

export const useFileFolderRenameModalStore = createStore(
  combine(
    {
      isModalVisible: false,
    },
    (set, get) => ({
      toggleModal: () => set(() => ({ isModalVisible: !get().isModalVisible })),
    })
  )
)

export const FileFolderRenameModal = ({
  folderId,
  folderName,
}: {
  folderId: number
  folderName: string
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { isModalVisible, toggleModal } = useFileFolderRenameModalStore()

  const submitFileRenameForm = async (values: FileFolderRenameForm) => {
    try {
      const { status } = await axios.put(`/v1/folders/${folderId}`, values)

      if (status === 200) {
        toggleModal()
        queryClient.invalidateQueries('files')
        showToast({
          type: 'success',
          message: `Folder successfully renamed!`,
        })
      }
    } catch (error) {
      if (((x): x is AxiosError<{ message: string }> => axios.isAxiosError(x))(error)) {
        return Promise.reject(new Error(error.response?.data.message))
      }
    }
  }

  return (
    <>
      {isModalVisible && (
        <Modal title="Rename Folder" onClose={toggleModal}>
          <Formik
            validationSchema={FileFolderRenameFormSchema}
            initialValues={{
              name: folderName,
            }}
            onSubmit={submitFileRenameForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  label="Folder Name"
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter Folder Name"
                  name="name"
                  className="mb-5"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={toggleModal} type="button" light>
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
