import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { Button } from '../components/Button'
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
import { CreateMarketingPlannerForm } from '../types/forms/CreateMarketingPlannerForm'
import { MarketingPlanner } from '../types/MarketingPlanner.type'
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
      const { status } = await axios.post<MarketingPlanner>(
        `/v1/clients/${session?.user.userType.clientId}/marketing-planners`,
        objectWithFileToFormData(values)
      )

      if (status === 201) {
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
                    <div className="mb-5 text-center text-sm font-semibold text-onyx">
                      Step 1: Event Details
                    </div>
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
                      size="h-86"
                      placeholder="Enter description"
                      name="description"
                      className="mb-5"
                    />
                    <FileDropZone
                      label="Upload Assets"
                      name="attachments"
                      className="mb-8"
                      maxSize={250}
                      mimeType="image/gif"
                      accept={['.gif', '.jpeg', '.mp4', '.png']}
                      multiple
                    />
                  </div>
                </div>
                <div className="h-fit w-75 rounded-xl bg-white p-5">
                  <div className="mb-5 text-center text-sm font-semibold text-onyx">
                    Step 2: To do List
                  </div>
                  {MarketingTodoListOptions?.map((todo) => {
                    return (
                      <Checkbox
                        key={`${todo.value}-todo`}
                        name="todoList"
                        label={todo.label}
                        value={todo.value}
                        className="mb-5"
                      />
                    )
                  })}
                </div>
                <div className="h-fit w-75">
                  <div className="rounded-xl bg-white p-5">
                    <div className="mb-5 text-center text-sm font-semibold text-onyx">
                      Step 3: My Task Management
                    </div>
                    {MarketingMyTaskManagementOptions?.map((mytask) => {
                      return (
                        <Checkbox
                          key={`${mytask.value}-my-task`}
                          name="taskManagement"
                          label={mytask.label}
                          value={mytask.value}
                          className="mb-5"
                        />
                      )
                    })}
                  </div>
                  <div className="mt-8 rounded-xl bg-white p-5">
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

NewMarketingPlannerPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default NewMarketingPlannerPage
