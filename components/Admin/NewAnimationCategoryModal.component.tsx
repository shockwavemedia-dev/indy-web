import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { MouseEventHandler } from 'react'
import { NewAnimationCategoryForm } from '../../interfaces/NewAnimationCategoryForm.interface'
import Button from '../Common/Button.component'
import PencilIcon from '../Common/Icons/Pencil.icon'
import TextInput from '../Common/TextInput.component'
import Modal from './Modal.component'

const NewAnimationCategoryModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
}) => {
  const { data: session } = useSession()
  const { replace } = useRouter()

  const formInitialValues: NewAnimationCategoryForm = {
    name: '',
  }

  const submitForm = async (
    values: NewAnimationCategoryForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const response = await axios.post('/v1/library-categories', values, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    if (response.status === 200) {
      replace('/service-request/category-animation')
    } else {
      setSubmitting(false)
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Category Animation" onClose={onClose}>
          <Formik initialValues={formInitialValues} onSubmit={submitForm}>
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="flex w-[560px] flex-col">
                  <div className="mb-[24px]">
                    <TextInput
                      Icon={PencilIcon}
                      placeholder="Category Animation  Name"
                      name="name"
                      disableAutoComplete
                    />
                  </div>
                  <div className="flex space-x-[12px]">
                    <Button ariaLabel="Cancel" light onClick={onClose}>
                      Cancel
                    </Button>
                    <Button ariaLabel="Submit" type="submit" disabled={isSubmitting}>
                      Submit
                    </Button>
                  </div>
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
