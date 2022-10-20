import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQuery, useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { ClientPrinterFormSchema } from '../../schemas/ClientPrinterFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { Client } from '../../types/Client.type'
import { ClientPrinterForm } from '../../types/forms/ClientPrinterForm.type'
import { Page } from '../../types/Page.type'
import { Printer } from '../../types/Printer.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { Button } from '../Button'
import { PrinterIcon } from '../icons/PrinterIcon'
import { Modal } from '../Modal'
import { Select } from '../Select'

export const useClientPrinterModalStore = createStore(
  combine(
    {
      client: undefined as Client | undefined,
    },
    (set) => ({
      toggleModal: (client?: Client) => set({ client }),
    })
  )
)

export const ClientPrinterModal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { client, toggleModal } = useClientPrinterModalStore()

  const { data: printer } = useQuery('printer', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Printer>
      page: Page
    }>('/v1/printers')

    return data
  })

  const printerOptions = printer
    ? printer.map(({ companyName, id }) => ({
        label: companyName,
        value: id,
      }))
    : []

  const submitForm = async (values: ClientPrinterForm) => {
    try {
      const { status } = await axios.put(`/v1/clients/${client?.id}`, {
        printerId: values.printerId,
      })

      if (status === 200) {
        queryClient.invalidateQueries('clients')
        queryClient.invalidateQueries('printerCompany')
        toggleModal()
        showToast({
          type: 'success',
          message: 'Printer Company successfully saved!',
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
      {client && (
        <Modal
          title="Client Printer Company"
          onClose={toggleModal}
          className="w-155 border-2 border-solid border-bright-gray"
        >
          <Formik
            validationSchema={ClientPrinterFormSchema}
            initialValues={{
              printerId: (client?.printer && client?.printer.id) || -1,
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <Select
                  label="Printer"
                  name="printerId"
                  Icon={PrinterIcon}
                  options={printerOptions}
                  defaultValue={(() => {
                    const printerId = client?.printer !== null ? client?.printer.id : -1
                    const printer = printerOptions.find(({ value }) => value === printerId)

                    if (printer) {
                      return printer
                    }

                    return undefined
                  })()}
                  className="mb-5"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={() => toggleModal()} type="button" light>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                    Save
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
