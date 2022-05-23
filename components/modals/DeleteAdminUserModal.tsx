import axios from 'axios'
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
            <div className="mb-8 flex space-x-20">
              <TitleValue title="Name" className="capitalize">
                {user.firstName}
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
