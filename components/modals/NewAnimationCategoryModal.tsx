import axios from 'axios'
import { Form, Formik } from 'formik'
import { NewAnimationCategoryFormSchema } from '../../schemas/NewAnimationCategoryFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { NewAnimationCategoryForm } from '../../types/forms/NewAnimationCategoryForm.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { Button } from '../Button'
import { PencilIcon } from '../icons/PencilIcon'
import { Modal } from '../Modal'
import { TextInput } from '../TextInput'

export const NewAnimationCategoryModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const { showToast } = useToastStore()

  const submitForm = async (values: NewAnimationCategoryForm) => {
    try {
      const { status } = await axios.post('/v1/library-categories', values)

      if (status === 200) {
        onClose()
        showToast({
          type: 'success',
          message: 'New Animation Category successfully created!',
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
      {isVisible && (
        <Modal title="New Category Animation" onClose={onClose}>
          <Formik
            validationSchema={NewAnimationCategoryFormSchema}
            initialValues={{
              name: '',
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  type="text"
                  Icon={PencilIcon}
                  placeholder="Category Animation  Name"
                  name="name"
                  className="mb-8"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
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
