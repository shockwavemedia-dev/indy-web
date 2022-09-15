import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { CreateSocialMediaCommentFormSchema } from '../../schemas/CreateSocialMediaCommentFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { CreateSocialMediaCommentForm } from '../../types/forms/CreateSocialMediaCommentForm.type'
import { Button } from '../Button'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { TextInput } from '../TextInput'

export const useSocialMediaCommentModalStore = createStore(
  combine(
    {
      socialMediaId: -1,
      commentId: -1,
      comment: '',
    },
    (set) => ({
      toggleModal: (socialMediaId?: number, commentId?: number, comment?: string) =>
        set(() => ({
          socialMediaId: socialMediaId ?? -1,
          commentId: commentId ?? -1,
          comment: comment ?? '',
        })),
    })
  )
)

export const EditSocialMediaCommentModal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { socialMediaId, commentId, comment, toggleModal } = useSocialMediaCommentModalStore()

  const submitEditCommentForm = async (values: CreateSocialMediaCommentForm) => {
    try {
      const { status } = await axios.put(`/v1/social-media-comments/${commentId}`, values)

      if (status === 200) {
        toggleModal()
        queryClient.invalidateQueries(['socialMedia', socialMediaId])
        queryClient.invalidateQueries(['socialMedias'])
        showToast({
          type: 'success',
          message: 'Comment successfully updated!',
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
      {commentId !== -1 && comment && (
        <Modal
          title="Edit Comment"
          className="border-2 border-solid border-bright-gray"
          onClose={toggleModal}
        >
          <Formik
            validationSchema={CreateSocialMediaCommentFormSchema}
            initialValues={{
              comment: comment,
            }}
            onSubmit={submitEditCommentForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  label="Social Media Comment"
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter Comment"
                  name="comment"
                  className="mb-8"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={toggleModal} type="button" light>
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
