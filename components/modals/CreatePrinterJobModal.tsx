import axios from 'axios'
import { Form, Formik } from 'formik'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { PrintExtrasOptions } from '../../constants/options/PrintExtrasOptions'
import { CreatePrinterJobFormSchema } from '../../schemas/CreatePrinterJobFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { CreatePrinterJobForm } from '../../types/forms/CreatePrinterJobForm.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { Button } from '../Button'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { Select } from '../Select'
import { TextInput } from '../TextInput'

export const useCreatePrinterJobModalStore = createStore(
  combine(
    {
      clientId: -1,
      ticketFileId: -1,
    },
    (set) => ({
      toggleModal: (clientId?: number, ticketFileId?: number) =>
        set(() => ({ clientId: clientId ?? -1, ticketFileId: ticketFileId ?? -1 })),
    })
  )
)

export const CreatePrinterJobModal = () => {
  const { showToast } = useToastStore()
  const { clientId, ticketFileId, toggleModal } = useCreatePrinterJobModalStore()

  const submitForm = async (values: CreatePrinterJobForm) => {
    const fileIds = [ticketFileId]
    try {
      const { status } = await axios.post(`/v1/clients/${clientId}/printer-jobs`, {
        ...values,
        fileIds,
      })

      if (status === 200) {
        toggleModal()
        showToast({
          type: 'success',
          message: 'Print successfully created!',
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
      {clientId !== -1 && ticketFileId !== 1 && (
        <Modal title="Create Print" onClose={() => toggleModal()}>
          <Formik
            validationSchema={CreatePrinterJobFormSchema}
            initialValues={{
              description: '',
              quantity: '',
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <Select
                  name="description"
                  Icon={ClipboardIcon}
                  placeholder="Select Extra"
                  options={PrintExtrasOptions}
                  className="mb-5"
                />
                <TextInput
                  label="Quantity"
                  type="number"
                  Icon={EditIcon}
                  placeholder="Enter Number"
                  name="quantity"
                  className="mb-8"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={() => toggleModal()} type="button" light>
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
