import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQuery, useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { AdminUserRoleOptions } from '../../constants/options/AdminUserRoleOptions'
import { UserStatusOptions } from '../../constants/options/UserStatusOptions'
import { EditAdminUserFormSchema } from '../../schemas/EditAdminUserFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { Department } from '../../types/Department.type'
import { EditAdminUserForm } from '../../types/forms/EditAdminUserForm.type'
import { Page } from '../../types/Page.type'
import { User } from '../../types/User.type'
import { Button } from '../Button'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { FloppyDiskIcon } from '../icons/FloppyDiskIcon'
import { GearIcon } from '../icons/GearIcon'
import { PencilIcon } from '../icons/PencilIcon'
import { UserIcon } from '../icons/UserIcon'
import { Modal } from '../Modal'
import { Select } from '../Select'
import { TextInput } from '../TextInput'
import { TitleValue } from '../TitleValue'

export const useEditUserModal = createStore(
  combine(
    {
      user: undefined as User | undefined,
    },
    (set) => ({
      toggleEditUserModal: (user?: User) => set(() => ({ user })),
    })
  )
)

export const EditUserModal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const user = useEditUserModal((state) => state.user)
  const toggleEditUserModal = useEditUserModal((state) => state.toggleEditUserModal)

  const { data: departments } = useQuery('departments', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Department>
      page: Page
    }>('/v1/departments')

    return data
  })

  const departmentOptions = departments?.map((department) => ({
    value: department.id,
    label: department.name,
  }))

  const submitForm = async (values: EditAdminUserForm) => {
    try {
      const { status } = await axios.put(`/v1/users/${values.id}`, values)

      if (status === 200) {
        queryClient.invalidateQueries('users')
        toggleEditUserModal()
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

  if (!user) return null

  return (
    <Modal title={`Edit Admin User`} onClose={toggleEditUserModal}>
      <Formik
        validationSchema={EditAdminUserFormSchema}
        initialValues={{
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          contactNumber: user.contactNumber,
          role: user.userType?.role,
          status: user.status,
          position: user.userType?.position ?? '',
          departmentId: user.userType?.role !== 'admin' ? user.userType?.department.id : null,
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
                    ({ value }) => value === user.userType?.role
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
                {departmentOptions &&
                  departmentOptions.length > 0 &&
                  user.userType?.role !== 'admin' && (
                    <Select
                      label="Deparment"
                      name="departmentId"
                      Icon={PencilIcon}
                      placeholder="Select Department"
                      className="mb-5"
                      options={departmentOptions}
                      defaultValue={departmentOptions.find(
                        ({ value }) => value === user.userType?.department.id
                      )}
                    />
                  )}
                <TextInput
                  label="Position"
                  type="text"
                  Icon={GearIcon}
                  placeholder="Position / Title"
                  name="position"
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
                  label="Last Name"
                  type="text"
                  Icon={UserIcon}
                  placeholder="Enter Last Name"
                  name="lastName"
                />
              </div>
              <div className="mb-8 flex space-x-5">
                <TextInput
                  label="Phone"
                  type="text"
                  Icon={PencilIcon}
                  placeholder="Enter Phone"
                  name="contactNumber"
                />
              </div>
              <div className="flex space-x-5">
                <Button
                  ariaLabel="Cancel"
                  onClick={() => toggleEditUserModal()}
                  type="button"
                  light
                >
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
  )
}
