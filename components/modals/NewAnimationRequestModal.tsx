import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQuery } from 'react-query'
import { NewAnimationRequestFormSchema } from '../../schemas/NewAnimationRequestFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { Animation } from '../../types/Animation.type'
import { NewAnimationRequestForm } from '../../types/forms/NewAnimationRequestForm.type'
import { Page } from '../../types/Page.type'
import { Button } from '../Button'
import { EditIcon } from '../icons/EditIcon'
import { PencilIcon } from '../icons/PencilIcon'
import { Modal } from '../Modal'
import { RichTextInput } from '../RichTextInput'
import { Select } from '../Select'

export const NewAnimationRequestModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const { showToast } = useToastStore()

  const { data: libraries } = useQuery(
    'libraries',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<Animation>
        page: Page
      }>('/v1/libraries', {
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

  const libraryOptions = libraries?.map((library) => ({
    value: library.id,
    label: library.title,
  }))

  const submitForm = async (values: NewAnimationRequestForm) => {
    try {
      const {
        status,
        data: { ticketCode },
      } = await axios.post(`/v1/libraries/${values.libraryId}/ticket`, values)

      if (status === 200) {
        onClose()
        showToast({
          type: 'success',
          message: `New Ticket ${ticketCode} successfully created!`,
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong! 😵',
      })
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="Request New Animation" onClose={onClose}>
          <Formik
            validationSchema={NewAnimationRequestFormSchema}
            initialValues={{
              libraryId: -1,
              description: '',
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <Select
                  name="libraryId"
                  Icon={PencilIcon}
                  placeholder="Select Animation"
                  options={libraryOptions || []}
                  className="mb-5"
                />

                <RichTextInput
                  Icon={EditIcon}
                  placeholder="Enter description"
                  name="description"
                  className="mb-5"
                />

                <video
                  muted
                  autoPlay
                  loop
                  style={{ width: '500px', height: '500px', marginTop: '-90px' }}
                >
                  <source src="https://s3.ap-southeast-2.amazonaws.com/depixed-2019-ezypro/_Libraries/AFL%20V1_15338826195b6d30fb9575c.mp4" />
                </video>
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
