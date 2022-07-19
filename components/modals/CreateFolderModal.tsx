import axios, { AxiosError } from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { CreateFolderFormSchema } from '../../schemas/CreateFolderFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { CreateFolderForm } from '../../types/forms/CreateFolderForm.type'
import { Button } from '../Button'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { TextInput } from '../TextInput'

export const useCreateFolderModalStore = createStore(
  combine(
    {
      isModalVisible: false,
    },
    (set, get) => ({
      toggleModal: () => set(() => ({ isModalVisible: !get().isModalVisible })),
    })
  )
)

export const CreateFolderModal = ({ parentFolderId }: { parentFolderId?: number }) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { isModalVisible, toggleModal } = useCreateFolderModalStore()

  const submitForm = async (values: CreateFolderForm) => {
    try {
      const { status } = await axios.post(
        `/v1/clients/${session?.user.userType.clientId}/folders`,
        values
      )

      if (status === 200) {
        toggleModal()
        queryClient.invalidateQueries('clientFiles')
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
            validationSchema={CreateFolderFormSchema}
            initialValues={{
              name: '',
              parentFolderId: parentFolderId,
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
