import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import { AdminUserRoleOptions } from '../../constants/options/AdminUserRoleOptions'
import { UserGenderOptions } from '../../constants/options/UserGenderOptions'
import { UserStatusOptions } from '../../constants/options/UserStatusOptions'
import { useToastStore } from '../../store/ToastStore'
import { EditAdminUserForm } from '../../types/forms/EditAdminUserForm.type'
import { User } from '../../types/User.type'
import { Button } from '../Button'
import { DateInput } from '../DateInput'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { FloppyDiskIcon } from '../icons/FloppyDiskIcon'
import { PencilIcon } from '../icons/PencilIcon'
import { UserIcon } from '../icons/UserIcon'
import { Modal } from '../Modal'
import { Select } from '../Select'
import { TextInput } from '../TextInput'
import { TitleValue } from '../TitleValue'

export const EditAdminUserModal = ({
  isVisible,
  onClose,
  user,
}: {
  isVisible: boolean
  onClose: () => void
  user: User
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const submitForm = async (values: EditAdminUserForm) => {
    try {
      const { status } = await axios.put(`/v1/users/${user.id}`, values)

      if (status === 200) {
        queryClient.invalidateQueries('users')
        onClose()
        showToast({
          type: 'success',
          message: 'All changes was successfully saved',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong',
      })
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="Edit User" onClose={onClose}>
          <Formik
            initialValues={{
              firstName: user.firstName,
              middleName: user.middleName,
              lastName: user.lastName,
              birthDate: user.birthDate,
              contactNumber: user.contactNumber,
              gender: user.gender,
              role: user.userType.role,
              status: user.status,
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <div className="mb-8 flex w-140 flex-col">
                  <div className="mb-5 flex space-x-20">
                    <TitleValue title="Email">{user.email}</TitleValue>
                  </div>
                  <div className="mb-5 flex space-x-5">
                    <Select
                      label="Role"
                      name="role"
                      Icon={ClipboardIcon}
                      options={AdminUserRoleOptions}
                      defaultValue={AdminUserRoleOptions.find(
                        ({ value }) => value === user.userType.role
                      )}
                    />
                    <Select
                      label="Status"
                      name="status"
                      Icon={ClipboardIcon}
                      options={UserStatusOptions}
                      defaultValue={UserStatusOptions.find(({ value }) => value === user.status)}
                    />
                  </div>
                  <div className="mb-5 flex space-x-5">
                    <TextInput
                      label="First Name"
                      type="text"
                      Icon={UserIcon}
                      placeholder="Enter First Name"
                      name="firstName"
                    />
                    <TextInput
                      label="Middle Name"
                      type="text"
                      Icon={UserIcon}
                      placeholder="Enter Middle Name"
                      name="middleName"
                    />
                  </div>
                  <div className="mb-5 flex space-x-5">
                    <TextInput
                      label="Last Name"
                      type="text"
                      Icon={UserIcon}
                      placeholder="Enter Last Name"
                      name="lastName"
                    />
                    <Select
                      label="Gender"
                      name="gender"
                      Icon={UserIcon}
                      options={UserGenderOptions}
                      defaultValue={UserGenderOptions.find(({ value }) => value === user.gender)}
                    />
                  </div>
                  <div className="mb-8 flex space-x-5">
                    <DateInput label="Birth Date" name="birthDate" placeholder="Enter Birth Date" />
                    <TextInput
                      label="Phone"
                      type="text"
                      Icon={PencilIcon}
                      placeholder="Enter Phone"
                      name="contactNumber"
                    />
                  </div>
                  <div className="flex space-x-5">
                    <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                      Cancel
                    </Button>
                    <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                      <FloppyDiskIcon className="stroke-white" />
                      <div>Save</div>
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  )
}
