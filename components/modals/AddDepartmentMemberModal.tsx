import axios from 'axios'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useQuery, useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { AddDepartmentMembersFormSchema } from '../../schemas/AddDepartmentMembersFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { AddDepartmentMembersForm } from '../../types/forms/AddDepartmentMembersForm.type'
import { Page } from '../../types/Page.type'
import { User } from '../../types/User.type'
import { Button } from '../Button'
import { UserIcon } from '../icons/UserIcon'
import { Modal } from '../Modal'
import { Select } from '../Select'

export const useAddDepartmentMemberModalStore = createStore(
  combine(
    {
      isModalVisible: false,
    },
    (set, get) => ({
      toggleModal: () => set(() => ({ isModalVisible: !get().isModalVisible })),
    })
  )
)

export const AddDepartmentMemberModal = () => {
  const departmentId = useRouter().asPath.split('/').pop()
  const { showToast } = useToastStore()
  const { isModalVisible, toggleModal } = useAddDepartmentMemberModalStore()
  const queryClient = useQueryClient()

  const { data: users } = useQuery(
    'users',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<User>
        page: Page
      }>('/v1/users', {
        params: {
          size: 50,
        },
      })

      return data
    },
    {
      enabled: isModalVisible,
    }
  )

  const addDepartmentMember = async (values: AddDepartmentMembersForm) => {
    try {
      const { status } = await axios.post(`/v1/departments/${departmentId}/members`, values)

      if (status === 200) {
        queryClient.invalidateQueries(['department', Number(departmentId)])
        toggleModal()
        showToast({
          type: 'success',
          message: `Member${values.adminUsers.length === 1 ? '' : 's'}  added!`,
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong! 😵',
      })
    }
  }

  return (
    <>
      {isModalVisible && (
        <Modal title="Add Members" onClose={toggleModal}>
          <Formik
            validationSchema={AddDepartmentMembersFormSchema}
            initialValues={{
              adminUsers: [],
            }}
            onSubmit={addDepartmentMember}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-102 flex-col">
                <Select
                  name="adminUsers"
                  Icon={UserIcon}
                  placeholder="Select Users"
                  options={users?.map(({ userType: { id }, fullName }) => ({
                    value: id,
                    label: fullName,
                  }))}
                  isMulti
                  className="mb-8"
                  closeMenuOnSelect={false}
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
