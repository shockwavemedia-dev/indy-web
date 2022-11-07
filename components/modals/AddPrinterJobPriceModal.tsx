import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { PrinterJobPriceFormSchema } from '../../schemas/PrinterJobPriceFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { PrinterJobPriceForm } from '../../types/forms/PrinterJobPriceForm.type'
import { PrinterJob } from '../../types/PrinterJob.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { Button } from '../Button'
import { DollarIcon } from '../icons/DollarIcon'
import { Modal } from '../Modal'
import { TextInput } from '../TextInput'

export const useAddPrinterJoPricebModalModalStore = createStore(
  combine(
    {
      printer: undefined as PrinterJob | undefined,
    },
    (set) => ({
      toggleModal: (printer?: PrinterJob) => set({ printer }),
    })
  )
)

export const AddPrinterJobPriceModal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { printer, toggleModal } = useAddPrinterJoPricebModalModalStore()

  const submitForm = async (values: PrinterJobPriceForm) => {
    try {
      const { status } = await axios.put(`/v1/printer-jobs/${printer?.id}/assign-price`, values)

      if (status === 200) {
        queryClient.invalidateQueries(['printer', printer?.id])
        queryClient.invalidateQueries(['printerJobs'])
        toggleModal()
        showToast({
          type: 'success',
          message: 'Print Price saved!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: get422And400ResponseError(e),
      })
    }
  }

  return (
    <>
      {printer && (
        <Modal
          title="Print Price"
          onClose={toggleModal}
          className="w-155 border-2 border-solid border-bright-gray"
        >
          <Formik
            validationSchema={PrinterJobPriceFormSchema}
            initialValues={{
              price: printer?.price,
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  type="number"
                  Icon={DollarIcon}
                  placeholder="Enter Price"
                  name="price"
                  className="mb-5"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={() => toggleModal()} type="button" light>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                    Add
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
