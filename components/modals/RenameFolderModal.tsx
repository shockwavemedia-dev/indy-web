import axios, { AxiosError } from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { RenameFolderFormSchema } from '../../schemas/RenameFolderFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { RenameFolderForm } from '../../types/forms/RenameFolderForm.type'
import { Button } from '../Button'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { TextInput } from '../TextInput'

export const useRenameFolderModalStore = createStore(
  combine(
    {
      folderId: -1,
      folderName: '',
    },
    (set) => ({
      toggleModal: (folderId?: number, folderName?: string) =>
        set(() => ({ folderId: folderId ?? -1, folderName: folderName ?? '' })),
    })
  )
)

export const RenameFolderModal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { folderId, folderName, toggleModal } = useRenameFolderModalStore()

  const submitRenameFolderForm = async (values: RenameFolderForm) => {
    try {
      const { status } = await axios.put(`/v1/folders/${folderId}`, values)

      if (status === 200) {
        toggleModal()
        queryClient.invalidateQueries('clientFiles')
        showToast({
          type: 'success',
          message: 'Folder successfully renamed!',
        })
      }
    } catch (error) {
      if (((x): x is AxiosError<{ message: string }> => axios.isAxiosError(x))(error)) {
        if (error.response?.data.message) {
          showToast({
            type: 'error',
            message: error.response?.data.message,
          })
        }
      }
    }
  }

  return (
    <>
      {folderId !== -1 && folderName && (
        <Modal title="Rename Folder" onClose={toggleModal}>
          <Formik
            validationSchema={RenameFolderFormSchema}
            initialValues={{
              name: folderName,
            }}
            onSubmit={submitRenameFolderForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  label="Folder Name"
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter Folder Name"
                  name="name"
                  className="mb-8"
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
