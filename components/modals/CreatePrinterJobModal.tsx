import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
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
      fileId: -1,
    },
    (set) => ({
      toggleModal: (clientId?: number, fileId?: number) =>
        set(() => ({ clientId: clientId ?? -1, fileId: fileId ?? -1 })),
    })
  )
)

export const CreatePrinterJobModal = () => {
  const { showToast } = useToastStore()
  const { clientId, fileId, toggleModal } = useCreatePrinterJobModalStore()
  const { data: session } = useSession()

  const submitForm = async (values: CreatePrinterJobForm) => {
    try {
      const { status } = await axios.post(`/v1/clients/${clientId}/printer-jobs`, {
        description: values.size,
        quantity: values.quantity,
        fileIds: [fileId],
        purchaseOrderNumber: session?.user.fullName,
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
      {clientId !== -1 && fileId !== 1 && (
        <Modal
          title="Create Print"
          className="border-2 border-solid border-halloween-orange"
          onClose={() => toggleModal()}
        >
          <Formik
            validationSchema={CreatePrinterJobFormSchema}
            initialValues={{
              size: '',
              quantity: '',
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <Select
                  name="size"
                  Icon={ClipboardIcon}
                  placeholder="Select Size"
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
