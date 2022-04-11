import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { ClientUserRoleOptions } from '../../constants/ClientUserRoleOptions'
import { UserGenderOptions } from '../../constants/UserGenderOptions'
import { Client } from '../../interfaces/Client.interface'
import { NewClientUserForm } from '../../interfaces/NewClientUserForm.interface'
import { Page } from '../../interfaces/Page.interface'
import { NewClientUserFormSchema } from '../../schemas/NewClientUserFormSchema'
import {
  computePasswordStrength,
  PasswordStrengthMeter,
} from '../Auth/PasswordStrengthMeter.component'
import Button from '../Common/Button.component'
import DateInput from '../Common/DateInput.component'
import BriefcaseIcon from '../Common/Icons/Briefcase.icon'
import ClipboardIcon from '../Common/Icons/Clipboard.icon'
import EmailIcon from '../Common/Icons/Email.icon'
import LockIcon from '../Common/Icons/Lock.icon'
import PencilIcon from '../Common/Icons/Pencil.icon'
import UserIcon from '../Common/Icons/User.icon'
import Select from '../Common/Select.component'
import TextInput from '../Common/TextInput.component'
import Modal from './Modal.component'
const NewClientUserModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const formInitialValues: NewClientUserForm = {
    email: '',
    password: '',
    birthDate: '',
    passwordConfirmation: '',
    contactNumber: '',
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    role: '',
    clientId: 0,
  }

  const [passwordStrength, setPasswordStrength] = useState(0)

  const updatePasswordStrength = (password: string) =>
    setPasswordStrength(computePasswordStrength(password))

  const roleOptions = ClientUserRoleOptions

  const genderOptions = UserGenderOptions

  const { data: clients } = useQuery('clients', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Client>
      page: Page
    }>('/v1/clients', {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    return data
  })

  const clientOptions = clients
    ?.filter((client) => client.status === 'active')
    .map((client) => ({
      value: client.id,
      label: client.name,
    }))

  const submitForm = async (
    values: NewClientUserForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/v1/users/client', values, {
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
        <Modal title="New Client User" onClose={onClose}>
          <Formik
            validationSchema={NewClientUserFormSchema}
            initialValues={formInitialValues}
            onSubmit={submitForm}
            validate={validateForm}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="flex w-140 flex-col">
                <Select
                  name="clientId"
                  Icon={BriefcaseIcon}
                  placeholder="Select Client"
                  options={clientOptions || []}
                  setFieldValue={setFieldValue}
                  className="mb-5"
                />
                <Select
                  name="role"
                  Icon={ClipboardIcon}
                  placeholder="Select Role"
                  options={roleOptions}
                  setFieldValue={setFieldValue}
                  className="mb-5"
                />
                <TextInput
                  Icon={UserIcon}
                  placeholder="Enter First Name"
                  name="firstName"
                  disableAutoComplete
                  className="mb-8"
                />
                <TextInput
                  Icon={UserIcon}
                  placeholder="Enter Middle Name"
                  name="middleName"
                  disableAutoComplete
                  className="mb-8"
                />
                <TextInput
                  Icon={UserIcon}
                  placeholder="Enter Last Name"
                  name="lastName"
                  disableAutoComplete
                  className="mb-8"
                />
                <Select
                  name="gender"
                  Icon={UserIcon}
                  placeholder="Select Gender"
                  options={genderOptions}
                  setFieldValue={setFieldValue}
                  className="mb-5"
                />
                <div className="mb-5 flex space-x-5">
                  <DateInput
                    name="birthDate"
                    placeholder="Enter Birth Date"
                    setFieldValue={setFieldValue}
                    className="mb-5"
                  />
                  <TextInput
                    Icon={PencilIcon}
                    placeholder="Enter Phone"
                    name="contactNumber"
                    disableAutoComplete
                  />
                </div>
                <TextInput
                  Icon={EmailIcon}
                  placeholder="Enter Email"
                  name="email"
                  disableAutoComplete
                  className="mb-5"
                />
                <div className="mb-3 flex w-full space-x-5">
                  <TextInput
                    type="password"
                    name="password"
                    Icon={LockIcon}
                    placeholder="Enter password"
                    disableAutoComplete
                  />
                  <TextInput
                    type="password"
                    name="passwordConfirmation"
                    Icon={LockIcon}
                    placeholder="Confirm password"
                    disableAutoComplete
                  />
                </div>
                <PasswordStrengthMeter strength={passwordStrength} className="mr-auto mb-2" />
                <div className="mr-auto mb-3 font-urbanist text-xxs font-medium text-metallic-silver">
                  Should be at least 8 symbols and contain one small
                  <br />
                  and one big character, special character and number
                </div>
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" light onClick={onClose}>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" type="submit" disabled={isSubmitting}>
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

export default NewClientUserModal
