import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { NewAnimationCategoryFormSchema } from '../../schemas/NewAnimationCategoryFormSchema'
import { NewAnimationCategoryForm } from '../../types/forms/NewAnimationCategoryForm.type'
import Button from '../common/Button'
import PencilIcon from '../common/icons/PencilIcon'
import TextInput from '../common/TextInput'
import Modal from './Modal'

const NewAnimationCategoryModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const { data: session } = useSession()

  const formInitialValues: NewAnimationCategoryForm = {
    name: '',
  }

  const submitForm = async (
    values: NewAnimationCategoryForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/v1/library-categories', values, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    if (status === 200) {
      onClose()
    }

    setSubmitting(false)
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Category Animation" onClose={onClose}>
          <Formik
            validationSchema={NewAnimationCategoryFormSchema}
            initialValues={formInitialValues}
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
                  <Button ariaLabel="Cancel" light onClick={onClose}>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" disabled={isSubmitting} submit>
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

export default NewAnimationCategoryModal