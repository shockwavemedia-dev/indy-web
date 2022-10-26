import axios from 'axios'
import { format } from 'date-fns'
import { useQueryClient } from 'react-query'
import { useToastStore } from '../../store/ToastStore'
import { PhotographyVideography } from '../../types/PhotographyVideography.type'
import { Button } from '../Button'
import { TrashIcon } from '../icons/TrashIcon'
import { Modal } from '../Modal'
import { TitleValue } from '../TitleValue'

export const DeletePhotographyVideographyModal = ({
  isVisible,
  onClose,
  photographyVideography,
}: {
  isVisible: boolean
  onClose: () => void
  photographyVideography: PhotographyVideography
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const deleteBooking = async () => {
    try {
      const { status } = await axios.delete(`/v1/event-bookings/${photographyVideography.id}`)

      if (status === 200) {
        queryClient.invalidateQueries('eventBookings')
        onClose()
        showToast({
          type: 'success',
          message: 'Event Booking successfully deleted!',
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
        <Modal title="Are you sure you want to delete this Booking?" onClose={onClose}>
          <div className="mb-8 flex w-140 flex-col">
            <div className="mb-8 grid w-full grid-cols-2 grid-rows-2 gap-y-5">
              <TitleValue title="Service Type" className="capitalize">
                {photographyVideography.serviceType}
              </TitleValue>
              <TitleValue title="Booking Type" className="capitalize">
                {photographyVideography.bookingType}
              </TitleValue>
              <TitleValue title="Shoot Title" className="capitalize">
                {photographyVideography.shootTitle}
              </TitleValue>
              <TitleValue title="Shoot Date" className="capitalize">
                {format(photographyVideography.shootDate, 'dd/MM/yyyy')}
              </TitleValue>
              <TitleValue title="Event Name" className="capitalize">
                {photographyVideography.eventName}
              </TitleValue>
            </div>
            <div className="flex space-x-5">
              <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                Cancel
              </Button>
              <Button ariaLabel="Submit" onClick={deleteBooking} type="submit">
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
