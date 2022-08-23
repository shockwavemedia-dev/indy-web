import axios from 'axios'
import Image from 'next/image'
import { useQueryClient } from 'react-query'
import { useToastStore } from '../../store/ToastStore'
import { Printer } from '../../types/Printer.type'
import { Button } from '../Button'
import { TrashIcon } from '../icons/TrashIcon'
import { Modal } from '../Modal'
import { RichTextDisplay } from '../RichTextDisplay'
import { TitleValue } from '../TitleValue'

export const DeletePrinterModal = ({
  isVisible,
  onClose,
  printer,
}: {
  isVisible: boolean
  onClose: () => void
  printer: Printer
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const deletePrinter = async () => {
    try {
      const { status } = await axios.delete(`/v1/printers/${printer.id}`)

      if (status === 200) {
        queryClient.invalidateQueries('printers')
        onClose()
        showToast({
          type: 'success',
          message: 'Printer successfully deleted!',
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
      {isVisible && (
        <Modal
          title={`Are you sure you want to delete Printer ${printer.companyName}?`}
          onClose={onClose}
        >
          <div className="flex w-140 flex-col">
            <div className="mb-8 flex space-x-8">
              <div className="h-30 w-30">
                <Image
                  src={printer.companyLogoUrl}
                  height={100}
                  width={100}
                  alt={printer.companyName}
                />
              </div>

              <div className="grid w-full grid-cols-2 grid-rows-2 gap-y-5">
                <TitleValue title="Company Name">{printer.companyName}</TitleValue>
                <TitleValue title="Email">{printer.email}</TitleValue>
                <TitleValue title="Contact Name">{printer!.contactName}</TitleValue>
                <TitleValue title="Phone">{printer!.phone}</TitleValue>
                <TitleValue title="Description">
                  {printer!.description && <RichTextDisplay value={printer!.description} />}
                </TitleValue>
              </div>
            </div>
            <div className="flex space-x-5">
              <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                Cancel
              </Button>
              <Button ariaLabel="Submit" onClick={deletePrinter} type="submit">
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
