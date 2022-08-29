import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { useToastStore } from '../../store/ToastStore'
import { AddServiceExtraForm } from '../../types/forms/AddServiceExtraForm.type'
import { Button } from '../Button'
import { TrashIcon } from '../icons/TrashIcon'
import { Modal } from '../Modal'

export const useDeleteServiceExtraModalStore = createStore(
  combine(
    {
      serviceId: -1,
      serviceExtras: [] as Array<string>,
      extraIndex: -1,
      extraValue: '',
    },
    (set) => ({
      toggleModal: (
        serviceId?: number,
        serviceExtras?: Array<string>,
        extraIndex?: number,
        extraValue?: string
      ) =>
        set(() => ({
          serviceId: serviceId ?? -1,
          serviceExtras: serviceExtras ?? [],
          extraIndex: extraIndex ?? -1,
          extraValue: extraValue ?? '',
        })),
    })
  )
)

export const DeleteServiceExtraModal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { serviceId, serviceExtras, extraIndex, extraValue, toggleModal } =
    useDeleteServiceExtraModalStore()

  const deleteExtra = async (values: AddServiceExtraForm) => {
    serviceExtras.splice(extraIndex, 1)
    values.extras = serviceExtras
    try {
      const { status } = await axios.put(`/v1/services/${serviceId}`, values)

      if (status === 200) {
        toggleModal()
        queryClient.invalidateQueries('services')
        showToast({
          type: 'success',
          message: 'Extra successfully deleted!',
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
        <Modal title={`Are you sure you want to delete extra ${extraValue}?`} onClose={toggleModal}>
          <Formik
            initialValues={{
              extras: [],
              extra: '',
            }}
            onSubmit={deleteExtra}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={toggleModal} type="button" light>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                    <TrashIcon className="stroke-white" />
                    <div>Delete</div>
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
