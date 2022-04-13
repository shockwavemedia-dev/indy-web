import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { ClientUserRoleOptions } from '../../../constants/options/ClientUserRoleOptions'
import { UserGenderOptions } from '../../../constants/options/UserGenderOptions'
import { NewClientUserFormSchema } from '../../../schemas/NewClientUserFormSchema'
import { Client } from '../../../types/Client.type'
import { NewClientUserForm } from '../../../types/forms/NewClientUserForm.type'
import { Page } from '../../../types/Page.type'
import Button from '../../common/Button'
import DateInput from '../../common/DateInput'
import BriefcaseIcon from '../../common/icons/BriefcaseIcon'
import ClipboardIcon from '../../common/icons/ClipboardIcon'
import EmailIcon from '../../common/icons/EmailIcon'
import LockIcon from '../../common/icons/LockIcon'
import PencilIcon from '../../common/icons/PencilIcon'
import UserIcon from '../../common/icons/UserIcon'
import PasswordInput from '../../common/PasswordInput'
import { computePasswordStrength, PasswordStrengthMeter } from '../../common/PasswordStrengthMeter'
import Select from '../../common/Select'
import TextInput from '../../common/TextInput'
import Modal from '../Modal'

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
    birthDate: null,
    passwordConfirmation: '',
    contactNumber: '',
    firstName: '',
    lastName: '',
    middleName: '',
    gender: null,
    role: null,
    clientId: 0,
  }

  const [passwordStrength, setPasswordStrength] = useState(0)

  const updatePasswordStrength = (password: string) =>
    setPasswordStrength(computePasswordStrength(password))

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
    .map(({ id, name }) => ({
      value: id,
      label: name,
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
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <Select
                  name="clientId"
                  Icon={BriefcaseIcon}
                  placeholder="Select Client"
                  options={clientOptions || []}
                  className="mb-5"
                />
                <Select
                  name="role"
                  Icon={ClipboardIcon}
                  placeholder="Select Role"
                  options={ClientUserRoleOptions}
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
                  <Button ariaLabel="Cancel" light onClick={onClose}>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" disabled={isSubmitting} submit>
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
