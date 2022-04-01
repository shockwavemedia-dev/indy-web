import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query'
import { CategoryAnimation } from '../../interfaces/CategoryAnimation.interface'
import { NewAnimationForm } from '../../interfaces/NewAnimationForm.interface'
import { Page } from '../../interfaces/Page.interface'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import Button from '../Common/Button.component'
import FileInput from '../Common/FileInput.component'
import PencilIcon from '../Common/Icons/Pencil.icon'
import Select from '../Common/Select.component'
import TextInput from '../Common/TextInput.component'
import Modal from './Modal.component'

const NewAnimationModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const { data: session } = useSession()

  const formInitialValues: NewAnimationForm = {
    title: '',
    description: '',
    library_category_id: 1,
    file: null,
  }

  const { data: categories } = useQuery('categories', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<CategoryAnimation>
      page: Page
    }>('/v1/library-categories', {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    return data
  })

  const categoryOptions = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const submitForm = async (
    values: NewAnimationForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    await axios.post('/v1/libraries', objectWithFileToFormData(values), {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    setSubmitting(false)
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Animation" onClose={onClose}>
          <Formik initialValues={formInitialValues} onSubmit={submitForm}>
            {({ isSubmitting, setFieldValue }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  Icon={PencilIcon}
                  placeholder="Animation Title"
                  name="title"
                  disableAutoComplete
                  className="mb-5"
                />
                <Select
                  name="libraryCategoryId"
                  Icon={PencilIcon}
                  placeholder="Select Category Animation"
                  options={categoryOptions || []}
                  setFieldValue={setFieldValue}
                  className="mb-5"
                />
                <TextInput
                  Icon={PencilIcon}
                  placeholder="Description"
                  name="description"
                  disableAutoComplete
                  className="mb-5"
                />
                <FileInput
                  label="Animation File"
                  name="file"
                  setFieldValue={setFieldValue}
                  className="mb-8"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" light onClick={onClose}>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" type="submit" disabled={isSubmitting}>
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

export default NewAnimationModal
