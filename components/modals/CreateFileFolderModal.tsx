import axios, { AxiosError } from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { CreateFileFolderFormSchema } from '../../schemas/CreateFileFolderFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { CreateFileFolderForm } from '../../types/forms/CreateFileFolderForm.type'
import { Button } from '../Button'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { TextInput } from '../TextInput'

export const useCreateFileFolderModalStore = createStore(
  combine(
    {
      isModalVisible: false,
    },
    (set, get) => ({
      toggleModal: () => set(() => ({ isModalVisible: !get().isModalVisible })),
    })
  )
)

export const CreateFileFolderModal = ({ parentFolderId }: { parentFolderId?: number }) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { isModalVisible, toggleModal } = useCreateFileFolderModalStore()

  const submitForm = async (values: CreateFileFolderForm) => {
    try {
      const { status } = await axios.post(
        `/v1/clients/${session?.user.userType.clientId}/folders`,
        values
      )

      if (status === 200) {
        toggleModal()
        queryClient.invalidateQueries('files')
        showToast({
          type: 'success',
          message: 'Folder successfully created!',
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
      {isModalVisible && (
        <Modal title="Create Folder" onClose={toggleModal}>
          <Formik
            validationSchema={CreateFileFolderFormSchema}
            initialValues={{
              parentFolderId: parentFolderId ? parentFolderId : null,
              name: '',
            }}
            onSubmit={submitForm}
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
