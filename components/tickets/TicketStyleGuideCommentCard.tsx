import axios from 'axios'
import { format } from 'date-fns'
import { Form, Formik } from 'formik'
import Image from 'next/image'
import { useQueryClient } from 'react-query'
import DummyProfilePic from '../../public/images/dummy-profile-pic.png'
import { CreateStyleGuideCommentFormSchema } from '../../schemas/CreateStyleGuideCommentFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { CreateStyleGuideCommentForm } from '../../types/forms/CreateStyleGuideCommentForm.type'
import { TicketStyleGuideComment } from '../../types/TicketStyleGuideComment.type'
import { Button } from '../Button'
import { EditIcon } from '../icons/EditIcon'
import { PaperPlaneIcon } from '../icons/PaperPlaneIcon'
import { RichTextDisplay } from '../RichTextDisplay'
import { RichTextInput } from '../RichTextInput'

export const TicketStyleGuideCommentCard = ({
  styleGuideComments,
  ticketId,
}: {
  styleGuideComments: Array<TicketStyleGuideComment> | null | undefined | []
  ticketId: number
}) => {
  const queryClient = useQueryClient()

  const { showToast } = useToastStore()

  const submitStyleGuideCommentForm = async (
    values: CreateStyleGuideCommentForm,
    {
      resetForm,
    }: {
      resetForm: () => void
    }
  ) => {
    const { status } = await axios.post(`/v1/tickets/${ticketId}/style-guide-comments`, {
      message: values.message,
    })
    if (status >= 200) {
      queryClient.invalidateQueries(['styleGuideComments'])
      showToast({
        type: 'success',
        message: `Comment posted successfully!`,
      })

      resetForm()
    }
  }

  return (
    <>
      {styleGuideComments && styleGuideComments?.length > 0 ? (
        styleGuideComments?.map((styleGuideComment) => (
          <div
            className="mb-8 space-y-3 rounded-xl bg-white px-6 py-5 shadow"
            key={`comment-${styleGuideComment.id}`}
          >
            <div className="flex items-center">
              {styleGuideComment.user.profileFile?.url && (
                <Image
                  src={styleGuideComment.user.profileFile.url}
                  height={50}
                  width={50}
                  alt="company logo"
                  className="rounded-lg"
                />
              )}
              {!styleGuideComment.user.profileFile && (
                <Image
                  src={DummyProfilePic}
                  height={50}
                  width={50}
                  alt="company logo"
                  className="rounded-lg"
                />
              )}
              <div className="ml-3 text-sm font-semibold text-onyx">
                {styleGuideComment.user.fullName}
              </div>
              <div className="mx-2 h-1 w-1 rounded bg-bright-gray" />
              <div className=" text-xs font-medium text-lavender-gray">
                {format(styleGuideComment.createdAt, 'dd/MM/yyyy')}
              </div>
            </div>
            <RichTextDisplay
              value={styleGuideComment.message}
              className="text-sm font-medium text-onyx"
            />
          </div>
        ))
      ) : (
        <div className=" text-xs text-metallic-silver">No comments to display.</div>
      )}
      <Formik
        validationSchema={CreateStyleGuideCommentFormSchema}
        initialValues={{ message: '' }}
        onSubmit={submitStyleGuideCommentForm}
      >
        {({ isSubmitting }) => (
          <Form className="">
            <RichTextInput
              Icon={EditIcon}
              placeholder="Enter message"
              name="message"
              inputActions={
                <div className="absolute right-6 bottom-2 z-10 flex items-center space-x-6">
                  <Button
                    ariaLabel="Submit Comment"
                    type="submit"
                    className="!w-fit px-2"
                    disabled={isSubmitting}
                  >
                    <PaperPlaneIcon className="stroke-white" />
                    <div>Submit Comment</div>
                  </Button>
                </div>
              }
            />
          </Form>
        )}
      </Formik>
    </>
  )
}
