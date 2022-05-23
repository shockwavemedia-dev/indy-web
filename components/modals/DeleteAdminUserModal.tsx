import axios from 'axios'
import { format } from 'date-fns'
import { useQueryClient } from 'react-query'
import { useToastStore } from '../../store/ToastStore'
import { User } from '../../types/User.type'
import { Button } from '../Button'
import { TrashIcon } from '../icons/TrashIcon'
import { Modal } from '../Modal'
import { TitleValue } from '../TitleValue'

export const DeleteAdminUserModal = ({
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

  const deleteAdminUser = async () => {
    try {
      const { status } = await axios.delete(`/v1/users/${user.id}`)

      if (status === 200) {
        queryClient.invalidateQueries(['users'])
        onClose()
        showToast({
          type: 'success',
          message: 'User successfully deactivated!',
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
        <Modal title="Are you sure you want to deactivate?" onClose={onClose}>
          <div className="mb-8 flex w-140 flex-col">
            <div className="mb-8 grid w-full grid-cols-4 grid-rows-2 gap-y-5">
              <TitleValue title="Email">{user.email}</TitleValue>
              <TitleValue title="Name" className="capitalize">
                {user.fullName}
              </TitleValue>
              <TitleValue title="Gender" className="capitalize">
                {user.gender}
              </TitleValue>
              <TitleValue title="Birth Date" className="capitalize">
                {format(user.birthDate, "yy MMM''dd")}
              </TitleValue>
              <TitleValue title="Phone" className="capitalize">
                {user.contactNumber}
              </TitleValue>
              <TitleValue title="Role" className="capitalize">
                {user.userType.role}
              </TitleValue>
              <TitleValue title="Status" className="capitalize">
                {user.status}
              </TitleValue>
            </div>
            <div className="flex space-x-5">
              <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                Cancel
              </Button>
              <Button ariaLabel="Submit" onClick={deleteAdminUser} type="submit">
                <TrashIcon className="stroke-white" />
                <div>Delete</div>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
