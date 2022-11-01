import axios from 'axios'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import create from 'zustand'
import { combine } from 'zustand/middleware'
import { ClientUserRoleOptions } from '../../constants/options/ClientUserRoleOptions'
import { NewClientUserFormSchema } from '../../schemas/NewClientUserFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { Client } from '../../types/Client.type'
import { NewClientUserForm } from '../../types/forms/NewClientUserForm.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { EmailIcon } from '../icons/EmailIcon'
import { LockIcon } from '../icons/LockIcon'
import { PencilIcon } from '../icons/PencilIcon'
import { UserIcon } from '../icons/UserIcon'
import { Modal } from '../Modal'
import { PasswordInput } from '../PasswordInput'
import { computePasswordStrength, PasswordStrengthMeter } from '../PasswordStrengthMeter'
import { Select } from '../Select'
import { TextInput } from '../TextInput'

export const useNewClientUserModal = create(
  combine(
    {
      client: undefined as Client | undefined,
    },
    (set) => ({
      toggleNewClientUserModal: (client?: Client) => set({ client }),
    })
  )
)

export const NewClientUserModal = () => {
  const client = useNewClientUserModal((state) => state.client)
  const toggleNewClientUserModal = useNewClientUserModal((state) => state.toggleNewClientUserModal)
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const [sendInvite, setPasswordVisibility] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const updatePasswordStrength = (password: string) =>
    setPasswordStrength(computePasswordStrength(password))

  const submitForm = async (values: NewClientUserForm) => {
    try {
      const { status } = await axios.post('/v1/users/client', values)

      if (status === 200) {
        setPasswordVisibility(false)
        queryClient.invalidateQueries('client-users')
        toggleNewClientUserModal()
        showToast({
          type: 'success',
          message: 'New User successfully created!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: get422And400ResponseError(e),
      })
    }
  }

  const validateForm = ({ password }: { password: string }) => updatePasswordStrength(password)

  return (
    <>
      {client && (
        <Modal title="New Client User" onClose={toggleNewClientUserModal}>
          <Formik
            validationSchema={NewClientUserFormSchema}
            initialValues={{
              clientId: client.id,
              email: '',
              password: '',
              passwordConfirmation: '',
              contactNumber: '',
              firstName: '',
              lastName: '',
              role: null,
              sendInvite: false,
            }}
            onSubmit={submitForm}
            validate={validateForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <div className="mb-5 flex space-x-5">
                  <Select
                    name="role"
                    Icon={ClipboardIcon}
                    placeholder="Select Role"
                    options={ClientUserRoleOptions}
                  />
                </div>
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
                <div className="mb-5 flex space-x-5">
                  <TextInput
                    type="text"
                    Icon={PencilIcon}
                    placeholder="Enter Phone"
                    name="contactNumber"
                  />
                </div>
                <TextInput
                  type="email"
                  Icon={EmailIcon}
                  placeholder="Enter Email"
                  name="email"
                  className="mb-5"
                />
                <div className="mb-5 flex space-x-5">
                  <Checkbox
                    onChange={() => setPasswordVisibility(!sendInvite)}
                    label="Send Invite"
                    name="sendInvite"
                  />
                </div>
                {!sendInvite && (
                  <div>
                    <div className="mb-3 flex w-full space-x-5">
                      <PasswordInput name="password" Icon={LockIcon} placeholder="Enter password" />
                      <PasswordInput
                        name="passwordConfirmation"
                        Icon={LockIcon}
                        placeholder="Confirm password"
                      />
                    </div>
                    <PasswordStrengthMeter strength={passwordStrength} className="mr-auto mb-2" />
                    <div className="mr-auto mb-8 text-xxs font-medium text-metallic-silver">
                      Should be at least 8 symbols and contain one small
                      <br />
                      and one big character, special character and number
                    </div>
                  </div>
                )}

                <div className="flex space-x-5">
                  <Button
                    ariaLabel="Cancel"
                    onClick={() => toggleNewClientUserModal()}
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
