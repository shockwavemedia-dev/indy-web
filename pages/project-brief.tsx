import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { Button } from '../components/Button'
import { Checkbox } from '../components/Checkbox'
import { DateInput } from '../components/DateInput'
import { FileDropZone } from '../components/FileDropZone'
import { EditIcon } from '../components/icons/EditIcon'
import { RichTextInput } from '../components/RichTextInput'
import { SelectServiceAndExtra } from '../components/SelectServiceAndExtra'
import { TextInput } from '../components/TextInput'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { CreateProjectBriefFormSchema } from '../schemas/CreateProjectBriefFormSchema'
import { useToastStore } from '../store/ToastStore'
import { CreateProjectBriefForm } from '../types/forms/CreateProjectBriefForm'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
import { Ticket } from '../types/Ticket.type'
import { objectWithFileToFormData } from '../utils/FormHelpers'

const ProjectBriefPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  const { data: session } = useSession()
  const { showToast } = useToastStore()
  const { replace } = useRouter()
  const queryClient = useQueryClient()

  const submitForm = async (values: CreateProjectBriefForm) => {
    try {
      const {
        status,
        data: { ticketCode },
      } = await axios.post<Ticket>('/v1/tickets/event', objectWithFileToFormData(values))

      if (status === 200) {
        queryClient.invalidateQueries('tickets')
        replace('/dashboard')
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

  useEffect(() => {
    setHeader('Project Brief')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Project Brief</title>
      </Head>
      <div className="h-full w-full">
        <hr className="mb-6 border-t-bright-gray" />
        <Formik
          validationSchema={CreateProjectBriefFormSchema}
          initialValues={{
            requestedBy: session?.user.id || -1,
            clientId: session?.user.userType.clientId || -1,
            subject: '',
            services: [],
            duedate: null,
            description: '',
            attachments: [],
          }}
          onSubmit={submitForm}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col">
              <div className="flex w-270 space-x-6">
                <div className="w-130 space-y-5 rounded-xl bg-white">
                  <div className="mx-5 my-5">
                    <TextInput
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter subject"
                      name="subject"
                      className="my-5"
                    />
                    <DateInput name="duedate" placeholder="Enter due date" className="mb-5" />
                    <RichTextInput
                      Icon={EditIcon}
                      placeholder="Enter description"
                      name="description"
                      className="mb-5"
                    />
                    <Checkbox label="Add to Marketing Plan" name="marketingPlan" className="mb-5" />
                    <FileDropZone
                      label="Upload Assets"
                      name="attachments"
                      className="mb-8"
                      maxSize={250}
                      mimeType="image/gif"
                      accept={['.gif', '.jpeg', '.mp4', '.png']}
                      multiple
                    />
                    <div className="flex space-x-5">
                      <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
                <SelectServiceAndExtra enabled />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

ProjectBriefPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ProjectBriefPage
