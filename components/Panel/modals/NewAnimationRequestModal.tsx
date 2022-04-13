import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query'
import { NewAnimationRequestFormSchema } from '../../../schemas/NewAnimationRequestFormSchema'
import { Animation } from '../../../types/Animation.type'
import { NewAnimationRequestForm } from '../../../types/forms/NewAnimationRequestForm.type'
import { Page } from '../../../types/Page.type'
import Button from '../../Common/Button'
import PencilIcon from '../../Common/icons/PencilIcon'
import Select from '../../Common/Select'
import TextInput from '../../Common/TextInput'
import Video from '../../Common/Video'
import Modal from '../Modal'

const NewAnimationRequestModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const { data: session } = useSession()

  const formInitialValues: NewAnimationRequestForm = {
    libraryId: -1,
    description: '',
  }

  const { data: libraries } = useQuery('libraries', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Animation>
      page: Page
    }>('/v1/libraries?size=100', {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    return data
  })

  const libraryOptions = libraries?.map((library) => ({
    value: library.id,
    label: library.title,
  }))

  const submitForm = async (
    values: NewAnimationRequestForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post(`/v1/libraries/${values.libraryId}/ticket`, values, {
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
        <Modal title="Request New Animation" onClose={onClose}>
          <Formik
            validationSchema={NewAnimationRequestFormSchema}
            initialValues={formInitialValues}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  type="text"
                  Icon={PencilIcon}
                  placeholder="Enter the promotion details you would like to appear on your video."
                  name="description"
                  className="mb-5"
                />
                <Select
                  name="libraryId"
                  Icon={PencilIcon}
                  placeholder="Select Animation"
                  options={libraryOptions || []}
                  className="mb-5"
                />
                <Video src="https://storage.googleapis.com/crm-admin-client/libraries/6a15061d042b93281b53f5fc67e989d7a786bad5-file_example_MP4_480_1_5MG.mp4?GoogleAccessId=test2-707%40loyal-burner-340623.iam.gserviceaccount.com&Expires=1680857928&Signature=XcY6M7gm1G%2B4GgH%2FADKALhuogSH%2B8uEYCqeweTDCpuRra3JY7mmNU323Tx0TNyXLiksYNDisgu8rIvz%2FgQNqLO9sCAKA8Km6aYku8hHVlNbtHcyJljhtsFzG9k30n0aZ5mUH70e7s9el01S7kxDeh9w8yDts8GuaECq5WQWLQRb8RXp37Q2rPTVtoqD1pIflu0XJeHHbXtWYIJAfGa5zZYuayJoFaZOjvtA4h7uN535aIYuSY1MtfXjkoDqM02Lbr82gj3TPb7qG8X5WtTxhYfvax6mO%2BeV5uN2TFPopX%2F0QX2KcCQjd1twUTiEyIr1qXFYhvy2KTsSFfGMp%2FxfF0g%3D%3D&generation=1649300328436473"></Video>
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

export default NewAnimationRequestModal
