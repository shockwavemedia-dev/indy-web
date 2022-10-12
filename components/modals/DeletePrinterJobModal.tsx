import axios from 'axios'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { useToastStore } from '../../store/ToastStore'
import { PrinterJob } from '../../types/PrinterJob.type'
import { Button } from '../Button'
import { TrashIcon } from '../icons/TrashIcon'
import { Modal } from '../Modal'
import { TitleValue } from '../TitleValue'

export const useDeleteDeletePrinterJobModalModalStore = createStore(
  combine(
    {
      printer: undefined as PrinterJob | undefined,
    },
    (set) => ({
      toggleModal: (printer?: PrinterJob) => set({ printer }),
    })
  )
)

export const DeletePrinterJobModal = () => {
  const queryClient = useQueryClient()
  const { replace } = useRouter()
  const { showToast } = useToastStore()
  const { printer, toggleModal } = useDeleteDeletePrinterJobModalModalStore()

  const deletePrinter = async () => {
    try {
      const { status } = await axios.delete(`/v1/printer-jobs/${printer?.id}`)

      if (status === 200) {
        queryClient.invalidateQueries(['printerJobs'])
        replace('/print')
        toggleModal()
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
      {printer && (
        <Modal
          title="Are you sure you want to delete this print job?"
          className="w-155 border-2 border-solid border-bright-gray"
          onClose={toggleModal}
        >
          <div className="mb-8 flex max-h-130 w-140 flex-col overflow-y-auto">
            <div className="flex flex-col">
              <div className=" mb-1 text-xs font-medium text-halloween-orange">Printer</div>
              <div className="mb-3 text-sm font-medium capitalize text-onyx">
                {printer?.printer !== null ? printer?.printer.companyName : 'No Printer Selected'}
              </div>
              <TitleValue title="Status" className="mb-3 capitalize">
                {printer?.status}
              </TitleValue>
              <TitleValue title="Customer" className="mb-5 capitalize">
                {printer?.customerName}
              </TitleValue>
              <div className=" mb-3 text-xs font-medium text-halloween-orange">Specifications</div>
              <div className="mb-2  grid grid-cols-2 gap-4">
                <TitleValue title="Product" className="mb-3 capitalize">
                  {printer?.product}
                </TitleValue>
              </div>
              <div className="mb-2  grid grid-cols-2 gap-4">
                <TitleValue title="Option" className="mb-3 capitalize">
                  {printer?.option}
                </TitleValue>
                <TitleValue title="Format" className="mb-3 capitalize">
                  {printer?.format}
                </TitleValue>
              </div>
              <div className="mb-2  grid grid-cols-3 gap-3">
                <TitleValue title="Kinds" className="mb-3 capitalize">
                  {printer?.kinds}
                </TitleValue>
                <TitleValue title="Quantity" className="mb-3 capitalize">
                  {printer?.quantity}
                </TitleValue>
                <TitleValue title="Run Ons" className="mb-3 capitalize">
                  {printer?.runOns}
                </TitleValue>
              </div>
            </div>
            <div className="flex w-full space-x-5">
              <Button ariaLabel="Cancel" onClick={() => toggleModal()} type="button" light>
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
