import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { AdminUserRoleOptions } from '../../../constants/options/AdminUserRoleOptions'
import { UserGenderOptions } from '../../../constants/options/UserGenderOptions'
import { NewAdminUserFormSchema } from '../../../schemas/NewAdminUserFormSchema'
import { NewAdminUserForm } from '../../../types/forms/NewAdminUserForm.type'
import Button from '../../Common/Button'
import DateInput from '../../Common/DateInput'
import ClipboardIcon from '../../Common/icons/ClipboardIcon'
import EmailIcon from '../../Common/icons/EmailIcon'
import LockIcon from '../../Common/icons/LockIcon'
import PencilIcon from '../../Common/icons/PencilIcon'
import UserIcon from '../../Common/icons/UserIcon'
import PasswordInput from '../../Common/PasswordInput'
import { computePasswordStrength, PasswordStrengthMeter } from '../../Common/PasswordStrengthMeter'
import Select from '../../Common/Select'
import TextInput from '../../Common/TextInput'
import Modal from '../Modal'

const NewAdminUserModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const formInitialValues: NewAdminUserForm = {
    email: '',
    password: '',
    birthDate: null,
    passwordConfirmation: '',
    contactNumber: '',
    firstName: '',
    lastName: '',
    middleName: '',
    gender: null,
    role: null,
  }

  const [passwordStrength, setPasswordStrength] = useState(0)

  const updatePasswordStrength = (password: string) =>
    setPasswordStrength(computePasswordStrength(password))

  const submitForm = async (
    values: NewAdminUserForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/v1/users/admin', values, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    if (status === 200) {
      queryClient.invalidateQueries('clients')
      onClose()
    }

    setSubmitting(false)
  }

  const validateForm = ({ password }: { password: string }) => updatePasswordStrength(password)

  return (
    <>
      {isVisible && (
        <Modal title="New Admin User" onClose={onClose}>
          <Formik
            validationSchema={NewAdminUserFormSchema}
            initialValues={formInitialValues}
            onSubmit={submitForm}
            validate={validateForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <Select
                  name="role"
                  Icon={ClipboardIcon}
                  placeholder="Select Role"
                  options={AdminUserRoleOptions}
                  className="mb-5"
                />
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
                  placeholder="Enter Middle Name"
                  name="middleName"
                  className="mb-5"
                />
                <TextInput
                  type="text"
                  Icon={UserIcon}
                  placeholder="Enter Last Name"
                  name="lastName"
                  className="mb-5"
                />
                <Select
                  name="gender"
                  Icon={UserIcon}
                  placeholder="Select Gender"
                  options={UserGenderOptions}
                  className="mb-5"
                />
                <div className="mb-5 flex space-x-5">
                  <DateInput name="birthDate" placeholder="Enter Birth Date" />
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
                <div className="mb-3 flex w-full space-x-5">
                  <PasswordInput name="password" Icon={LockIcon} placeholder="Enter password" />
                  <PasswordInput
                    name="passwordConfirmation"
                    Icon={LockIcon}
                    placeholder="Confirm password"
                  />
                </div>
                <PasswordStrengthMeter strength={passwordStrength} className="mr-auto mb-2" />
                <div className="mr-auto mb-8 font-urbanist text-xxs font-medium text-metallic-silver">
                  Should be at least 8 symbols and contain one small
                  <br />
                  and one big character, special character and number
                </div>
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
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

export default NewAdminUserModal
