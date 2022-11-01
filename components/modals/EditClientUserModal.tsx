import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import create from 'zustand'
import { combine } from 'zustand/middleware'
import { EditClientUserFormSchema } from '../../schemas/EditClientUserFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { ClientUser } from '../../types/ClientUser.type'
import { EditClientUserForm } from '../../types/forms/EditClientUserForm.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { Button } from '../Button'
import { EmailIcon } from '../icons/EmailIcon'
import { LockIcon } from '../icons/LockIcon'
import { UserIcon } from '../icons/UserIcon'
import { Modal } from '../Modal'
import { PasswordInput } from '../PasswordInput'
import { TextInput } from '../TextInput'

export const useEditClientUserModal = create(
  combine(
    {
      clientUser: undefined as ClientUser | undefined,
    },
    (set) => ({
      toggleEditClientUserModal: (clientUser?: ClientUser) => set({ clientUser }),
    })
  )
)

export const EditClientUserModal = () => {
  const clientUser = useEditClientUserModal((state) => state.clientUser)
  const toggleEditClientUserModal = useEditClientUserModal(
    (state) => state.toggleEditClientUserModal
  )
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const submitForm = async (values: EditClientUserForm) => {
    try {
      const { status } = await axios.put(`/v1/users/${clientUser!.id}`, values)

      if (status === 200) {
        queryClient.invalidateQueries(['client-users', clientUser!.userType.client.id])
        toggleEditClientUserModal()
        showToast({
          type: 'success',
          message: 'User successfully updated!',
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
      {clientUser && (
        <Modal title={`Edit ${clientUser.fullName}`} onClose={toggleEditClientUserModal}>
          <Formik
            validationSchema={EditClientUserFormSchema}
            initialValues={{
              clientId: clientUser.userType?.client.id,
              firstName: clientUser.firstName,
              lastName: clientUser.lastName,
              email: clientUser.email,
              password: '',
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <div className="mb-5 flex space-x-5">
                  <TextInput
                    type="text"
                    Icon={UserIcon}
                    placeholder="Enter First Name"
                    name="firstName"
                  />
                  <TextInput
                    type="text"
                    Icon={UserIcon}
                    placeholder="Enter Last Name"
                    name="lastName"
                  />
                </div>
                <div className="mb-3 flex w-full space-x-5">
                  <TextInput
                    type="email"
                    Icon={EmailIcon}
                    placeholder="Enter Email"
                    name="email"
                    className="mb-5"
                  />
                  <PasswordInput name="password" Icon={LockIcon} placeholder="Enter password" />
                </div>
                <div className="flex space-x-5">
                  <Button
                    ariaLabel="Cancel"
                    onClick={() => toggleEditClientUserModal()}
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
