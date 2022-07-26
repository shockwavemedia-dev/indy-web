import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Checkbox } from '../components/Checkbox'
import { DateInput } from '../components/DateInput'
import { FileDropZone } from '../components/FileDropZone'
import { EditIcon } from '../components/icons/EditIcon'
import { FloppyDiskIcon } from '../components/icons/FloppyDiskIcon'
import { RichTextInput } from '../components/RichTextInput'
import { TextInput } from '../components/TextInput'
import { MarketingMyTaskManagementOptions } from '../constants/options/MarketingMyTaskManagementOptions'
import { MarketingTodoListOptions } from '../constants/options/MarketingTodoListOptions'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { CreateMarketingPlannerFormSchema } from '../schemas/CreateMarketingPlannerFormSchema'
import { useToastStore } from '../store/ToastStore'
import { CreateMarketingPlannerForm } from '../types/forms/CreateMarketingPlannerForm.type'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
import { objectWithFileToFormData } from '../utils/FormHelpers'

const NewMarketingPlannerPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()
  const { showToast } = useToastStore()
  const { replace } = useRouter()
  const queryClient = useQueryClient()

  const submitForm = async (values: CreateMarketingPlannerForm) => {
    try {
      const { status } = await axios.post<CreateMarketingPlannerForm>(
        `/v1/clients/${session?.user.userType.clientId}/marketing-planners`,
        objectWithFileToFormData(values)
      )

      if (status === 201) {
        queryClient.invalidateQueries('marketingPlanner')
        replace('/marketing-planner')
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
    setHeader('New Marketing Planner')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - New Marketing Planner</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl">
        <Formik
          validationSchema={CreateMarketingPlannerFormSchema}
          initialValues={{
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
                <Card className="w-130" title="Step 1: Event Details" titlePosition="center">
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
                  <Checkbox name="isRecurring" label="Recurring Event" className="mb-5" />
                  <RichTextInput
                    Icon={EditIcon}
                    placeholder="Enter description"
                    name="description"
                    className="mb-5 h-86"
                  />
                  <FileDropZone
                    label="Upload Assets"
                    name="attachments"
                    maxSize={250}
                    mimeType="image/gif"
                    accept={['.gif', '.jpeg', '.mp4', '.png']}
                    multiple
                  />
                </Card>
                <Card
                  className="h-fit w-75 space-y-5 rounded-xl"
                  title="Step 2: To-do List"
                  titlePosition="center"
                >
                  {MarketingTodoListOptions?.map(({ value, label }) => (
                    <Checkbox key={`${value}-todo`} name="todoList" label={label} value={value} />
                  ))}
                </Card>
                <div className="h-fit w-75">
                  <Card
                    className="mb-6 space-y-5"
                    title="Step 3: My Task Management"
                    titlePosition="center"
                  >
                    {MarketingMyTaskManagementOptions?.map(({ value, label }) => (
                      <Checkbox
                        key={`${value}-my-task`}
                        name="taskManagement"
                        label={label}
                        value={value}
                      />
                    ))}
                  </Card>
                  <Card>
                    <div className="flex space-x-5">
                      <Link href="/marketing-planner">
                        <Button ariaLabel="Cancel" type="button" light>
                          Cancel
                        </Button>
                      </Link>
                      <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                        <FloppyDiskIcon className="stroke-white" />
                        <div>Save</div>
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

NewMarketingPlannerPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default NewMarketingPlannerPage
