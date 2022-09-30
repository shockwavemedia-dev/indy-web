import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { EditDepartmentFormSchema } from '../../schemas/EditDepartmentFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { Department } from '../../types/Department.type'
import { EditDepartmentForm } from '../../types/forms/EditDepartmentForm.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { Button } from '../Button'
import { PencilIcon } from '../icons/PencilIcon'
import { Modal } from '../Modal'
import { SelectService } from '../SelectService'
import { TextInput } from '../TextInput'

export const useEditDepartmentModal = createStore(
  combine(
    {
      department: {} as Department,
    },
    (set) => ({
      toggleModal: (department?: Department) => set(() => ({ department: department })),
    })
  )
)

export const EditDepartmentModal = () => {
  const queryClient = useQueryClient()
  const { department, toggleModal } = useEditDepartmentModal()
  const { showToast } = useToastStore()

  const submitForm = async (values: EditDepartmentForm) => {
    try {
      const { status } = await axios.put(`/v1/departments/${department.id}`, values)

      if (status === 200) {
        queryClient.invalidateQueries('departments')
        toggleModal()
        showToast({
          type: 'success',
          message: 'Department changes saved!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: get422And400ResponseError(e),
      })
    }
  }

  const closeModal = () => toggleModal()

  return (
    <>
      {department?.id && (
        <Modal
          title={`Edit ${department.name}`}
          onClose={closeModal}
          className="-translate-x-[calc(100%_-_11.75rem)]"
        >
          <Formik
            validationSchema={EditDepartmentFormSchema}
            initialValues={{
              description: department.description,
              services: department.services?.map(({ id }) => id) || [],
              minDeliveryDays: department.minDeliveryDays,
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  type="text"
                  Icon={PencilIcon}
                  placeholder="Description"
                  name="description"
                  className="mb-5"
                />
                <TextInput
                  type="text"
                  Icon={PencilIcon}
                  placeholder="Minimum Delivery Days"
                  name="minDeliveryDays"
                  className="mb-8"
                />
                <SelectService enabled={!!department.id} />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={closeModal} type="button" light>
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
