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
import { TextInput } from '../components/TextInput'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { CreateMarketingPlannerFormSchema } from '../schemas/CreateMarketingPlannerFormSchema'
import { useToastStore } from '../store/ToastStore'
import { CreateMarketingPlannerForm } from '../types/forms/CreateMarketingPlannerForm'
import { MarketingPlanner } from '../types/MarketingPlanner.type'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
import { objectWithFileToFormData } from '../utils/FormHelpers'

const MarketingPlannerPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()
  const { showToast } = useToastStore()
  const { replace } = useRouter()
  const queryClient = useQueryClient()

  const submitForm = async (values: CreateMarketingPlannerForm) => {
    try {
      const { status } = await axios.post<MarketingPlanner>(
        `/v1/clients/${session?.user.userType.clientId}/marketing-planners`,
        objectWithFileToFormData(values)
      )

      if (status === 200) {
        queryClient.invalidateQueries('marketingPlanner')
        replace('/dashboard')
        showToast({
          type: 'success',
          message: `New Marketing Planner successfully created!`,
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
    setHeader('Marketing Planner')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Marketing Planner</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl">
        <Formik
          validationSchema={CreateMarketingPlannerFormSchema}
          initialValues={{
            clientId: session?.user.userType.clientId || -1,
            eventName: '',
            description: '',
            startDate: null,
            endDate: null,
            isRecurring: false,
            taskManagement: [],
            todoList: [],
            attachments: [],
          }}
          onSubmit={submitForm}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex justify-center space-x-6">
                <div className="w-130 space-y-5 rounded-xl bg-white">
                  <div className="p-6">
                    <TextInput
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Event Name"
                      name="eventName"
                      className="mb-5"
                    />
                    <div className="mb-5 flex space-x-5">
                      <DateInput name="startDate" placeholder="Select Start Date" />
                      <DateInput name="endDate" placeholder="Select End Date" />
                    </div>
                    <RichTextInput
                      Icon={EditIcon}
                      size="h-86"
                      placeholder="Enter description"
                      name="description"
                      className="mb-5"
                    />
                    <Checkbox name="isRecurring" label="Recurring" className="mb-5" />
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
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

MarketingPlannerPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default MarketingPlannerPage
