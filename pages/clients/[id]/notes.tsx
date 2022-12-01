import axios from 'axios'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Button } from '../../../components/Button'
import { EditIcon } from '../../../components/icons/EditIcon'
import { PaperClipIcon } from '../../../components/icons/PaperClipIcon'
import { PaperPlaneIcon } from '../../../components/icons/PaperPlaneIcon'
import { RichTextInput } from '../../../components/RichTextInput'
import ClientLayout from '../../../layouts/ClientLayout'
import PanelLayout from '../../../layouts/PanelLayout'
import { CreateClientNoteSchema } from '../../../schemas/CreateClientNoteFormSchema'
import { useToastStore } from '../../../store/ToastStore'
import { Client } from '../../../types/Client.type'
import { CreateClientNoteForm } from '../../../types/forms/CreateClientNoteForm.type'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'

const ClientNotes: NextPageWithLayout = () => {
  const {
    query: { id },
  } = useRouter()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const { data } = useQuery(['clients', Number(id)], async () => {
    const { data } = await axios.get<Client>(`/v1/clients/${id}`)

    return data
  })

  if (!data) return null

  const submitNoteForm = async (values: CreateClientNoteForm) => {
    try {
      const { status } = await axios.put(`/v1/clients/${data.id}`, values)

      if (status === 200) {
        queryClient.invalidateQueries('clients')
        showToast({
          type: 'success',
          message: 'Note successfully saved!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong',
      })
    }
  }

  return (
    <>
      <div className="mx-auto w-full max-w-8xl space-y-5">
        <Formik
          validationSchema={CreateClientNoteSchema}
          initialValues={{ note: data.note }}
          onSubmit={submitNoteForm}
        >
          {({ isSubmitting }) => (
            <Form className="mb-5">
              <RichTextInput
                Icon={EditIcon}
                placeholder="Enter notes"
                name="note"
                className="h-103"
                inputActions={
                  <div className="absolute right-6 bottom-6 z-10 flex items-center space-x-6">
                    <input type="file" name="attachment" id="feedback-attachment" hidden />
                    <label htmlFor="feedback-attachment" className="cursor-pointer">
                      <PaperClipIcon className="stroke-waterloo" />
                    </label>
                    <Button
                      ariaLabel="Submit Notes"
                      type="submit"
                      className="!w-fit px-10"
                      disabled={isSubmitting}
                    >
                      <PaperPlaneIcon className="stroke-white" />
                      <div>Save</div>
                    </Button>
                  </div>
                }
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

ClientNotes.getLayout = (page: ReactElement) => (
  <PanelLayout>
    <ClientLayout>{page}</ClientLayout>
  </PanelLayout>
)

export default ClientNotes
