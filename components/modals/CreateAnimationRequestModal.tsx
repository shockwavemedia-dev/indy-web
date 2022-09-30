import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQuery, useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { NewAnimationRequestFormSchema } from '../../schemas/NewAnimationRequestFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { Animation } from '../../types/Animation.type'
import { NewAnimationRequestForm } from '../../types/forms/NewAnimationRequestForm.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { Button } from '../Button'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { RichTextInput } from '../RichTextInput'

export const useCreateAnimationRequestModal = createStore(
  combine(
    {
      animationId: -1,
    },
    (set) => ({
      toggleCreateAnimationRequestModal: (animationId?: number) =>
        set(() => ({
          animationId: animationId ?? -1,
        })),
    })
  )
)

export const CreateAnimationRequestModal = ({ onClose }: { onClose?: () => void }) => {
  const { showToast } = useToastStore()
  const queryClient = useQueryClient()
  const { animationId, toggleCreateAnimationRequestModal } = useCreateAnimationRequestModal()

  const { data: animation } = useQuery(
    ['animation', animationId],
    async () => {
      const { data } = await axios.get<Animation>(`/v1/libraries/${animationId}`)

      return data
    },
    {
      enabled: animationId > -1,
    }
  )

  const closeModal = () => {
    if (onClose) {
      onClose()
    }
    toggleCreateAnimationRequestModal()
  }

  const submitForm = async (values: NewAnimationRequestForm) => {
    try {
      const {
        status,
        data: { ticketCode },
      } = await axios.post(`/v1/libraries/${values.libraryId}/ticket`, values)

      if (status === 200) {
        queryClient.invalidateQueries('animations')
        closeModal()
        showToast({
          type: 'success',
          message: `New Ticket ${ticketCode} successfully created!`,
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
      {animationId > -1 && animation && (
        <Modal title={`Request ${animation.title} Animation`} onClose={closeModal}>
          <Formik
            validationSchema={NewAnimationRequestFormSchema}
            initialValues={{
              libraryId: animationId,
              description: '',
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <RichTextInput
                  Icon={EditIcon}
                  placeholder="Enter description"
                  name="description"
                  className="mb-5"
                />
                <video className="mb-5 w-140 rounded-xl" muted controls>
                  <source src={animation.videoLink} />
                </video>
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={closeModal} type="button" light>
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
