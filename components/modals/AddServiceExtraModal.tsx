import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { AddServiceExtraFormSchema } from '../../schemas/AddServiceExtraFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { AddServiceExtraForm } from '../../types/forms/AddServiceExtraForm.type'
import { Button } from '../Button'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { TextInput } from '../TextInput'

export const useAddServiceExtraModalStore = createStore(
  combine(
    {
      serviceId: -1,
      serviceExtras: [] as Array<string>,
    },
    (set) => ({
      toggleModal: (serviceId?: number, serviceExtras?: Array<string>) =>
        set(() => ({ serviceId: serviceId ?? -1, serviceExtras: serviceExtras ?? [] })),
    })
  )
)

export const AddServiceExtraModal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { serviceId, serviceExtras, toggleModal } = useAddServiceExtraModalStore()

  const addServiceExtra = async (values: AddServiceExtraForm) => {
    values.extras = [...serviceExtras, values.extra]
    try {
      const { status } = await axios.put(`/v1/services/${serviceId}`, values)

      if (status === 200) {
        toggleModal()
        queryClient.invalidateQueries('services')
        showToast({
          type: 'success',
          message: 'Extra successfully added!',
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
      {serviceId !== -1 && (
        <Modal title="Add Extra" onClose={toggleModal}>
          <Formik
            validationSchema={AddServiceExtraFormSchema}
            initialValues={{
              extras: [],
              extra: '',
            }}
            onSubmit={addServiceExtra}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  label="Extra Name"
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter Extra name"
                  name="extra"
                  className="mb-8"
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
