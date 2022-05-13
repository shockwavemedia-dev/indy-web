import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQuery } from 'react-query'
import { NewAnimationFormSchema } from '../../schemas/NewAnimationFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { CategoryAnimation } from '../../types/CategoryAnimation.type'
import { NewAnimationForm } from '../../types/forms/NewAnimationForm.type'
import { Page } from '../../types/Page.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import Button from '../Button'
import FileInput from '../FileInput'
import PencilIcon from '../icons/PencilIcon'
import Modal from '../Modal'
import Select from '../Select'
import TextInput from '../TextInput'

const NewAnimationModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const formInitialValues: NewAnimationForm = {
    title: '',
    description: '',
    libraryCategoryId: -1,
    file: null,
  }
  const { showToast } = useToastStore()

  const { data: categories } = useQuery(
    'categories',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<CategoryAnimation>
        page: Page
      }>('/v1/library-categories', {
        params: {
          size: 100,
        },
      })

      return data
    },
    {
      enabled: isVisible,
    }
  )

  const categoryOptions = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const submitForm = async (
    values: NewAnimationForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/v1/libraries', objectWithFileToFormData(values))

    if (status === 200) {
      onClose()
      showToast({
        type: 'success',
        message: 'Succesfully saved',
      })
    } else {
      showToast({
        type: 'error',
        message: 'Something went wrong',
      })
    }

    setSubmitting(false)
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Animation" onClose={onClose}>
          <Formik
            validationSchema={NewAnimationFormSchema}
            initialValues={formInitialValues}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  type="text"
                  Icon={PencilIcon}
                  placeholder="Animation Title"
                  name="title"
                  className="mb-5"
                />
                <Select
                  name="libraryCategoryId"
                  Icon={PencilIcon}
                  placeholder="Select Category Animation"
                  options={categoryOptions || []}
                  className="mb-5"
                />
                <TextInput
                  type="text"
                  Icon={PencilIcon}
                  placeholder="Description"
                  name="description"
                  className="mb-5"
                />
                <FileInput label="Animation File" name="file" className="mb-8" />
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

export default NewAnimationModal
