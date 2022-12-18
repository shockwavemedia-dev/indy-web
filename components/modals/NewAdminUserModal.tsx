import axios from 'axios'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { AdminUserRoleOptions } from '../../constants/options/AdminUserRoleOptions'
import { NewAdminUserFormSchema } from '../../schemas/NewAdminUserFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { Department } from '../../types/Department.type'
import { NewAdminUserForm } from '../../types/forms/NewAdminUserForm.type'
import { Page } from '../../types/Page.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { EmailIcon } from '../icons/EmailIcon'
import { GearIcon } from '../icons/GearIcon'
import { LockIcon } from '../icons/LockIcon'
import { PencilIcon } from '../icons/PencilIcon'
import { UserIcon } from '../icons/UserIcon'
import { Modal } from '../Modal'
import { PasswordInput } from '../PasswordInput'
import { computePasswordStrength, PasswordStrengthMeter } from '../PasswordStrengthMeter'
import { Select } from '../Select'
import { TextInput } from '../TextInput'

export const NewAdminUserModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const [passwordStrength, setPasswordStrength] = useState(0)
  const [sendInvite, setPasswordVisibility] = useState(false)

  const updatePasswordStrength = (password: string) =>
    setPasswordStrength(computePasswordStrength(password))

  const { data: departments } = useQuery(
    'departments',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<Department>
        page: Page
      }>('/v1/departments')

      return data
    },
    {
      enabled: isVisible,
    }
  )

  const submitForm = async (values: NewAdminUserForm) => {
    try {
      const { status } = await axios.post('/v1/users/admin', values)

      if (status === 200) {
        queryClient.invalidateQueries('users')
        onClose()
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
      {isVisible && (
        <Modal title="New Admin User" onClose={onClose}>
          <Formik
            validationSchema={NewAdminUserFormSchema}
            initialValues={{
              email: '',
              password: '',
              position: '',
              passwordConfirmation: '',
              contactNumber: '',
              firstName: '',
              lastName: '',
              role: null,
              departmentId: -1,
              sendInvite: false,
            }}
            onSubmit={submitForm}
            validate={validateForm}
          >
            {({ isSubmitting }) => (
              <Form className="w-160 flex flex-col">
                <div className="mb-5 flex space-x-5">
                  <Select
                    name="role"
                    Icon={ClipboardIcon}
                    placeholder="Select Role"
                    options={AdminUserRoleOptions}
                    className="mb-5"
                  />
                </div>
                <div className="mb-5 flex space-x-5">
                  <Select
                    name="departmentId"
                    Icon={ClipboardIcon}
                    placeholder="Select Department"
                    options={
                      departments?.map((department) => ({
                        value: department.id,
                        label: department.name,
                      })) ?? []
                    }
                    className="mb-5"
                  />
                  <TextInput
                    type="text"
                    Icon={GearIcon}
                    placeholder="Position/Title"
                    name="position"
                    className="mb-5"
                  />
                </div>
                <div className="mb-5 flex space-x-5">
                  <TextInput
                    type="text"
                    Icon={UserIcon}
                    placeholder="Enter First Name"
                    name="firstName"
                    className="mb-5"
                  />
                  <TextInput
                    type="text"
                    Icon={UserIcon}
                    placeholder="Enter Last Name"
                    name="lastName"
                    className="mb-5"
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
                  type="text"
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
                  <div className="mb-3 flex w-full space-x-5">
                    <PasswordInput name="password" Icon={LockIcon} placeholder="Enter password" />
                    <PasswordInput
                      name="passwordConfirmation"
                      Icon={LockIcon}
                      placeholder="Confirm password"
                    />
                  </div>
                )}
                <PasswordStrengthMeter strength={passwordStrength} className="mr-auto mb-2" />
                <div className="mr-auto mb-8 text-xxs font-medium text-metallic-silver">
                  Should be at least 8 symbols and contain one small
                  <br />
                  and one big character, special character and number
                </div>
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={() => onClose()} type="button" light>
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
