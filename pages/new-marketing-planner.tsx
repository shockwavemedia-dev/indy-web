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
import { PlusIcon } from '../components/icons/PlusIcon'
import { AddCustomTodoModal, useAddCustomTodoModal } from '../components/modals/AddCustomTodoModal'
import { RichTextInput } from '../components/RichTextInput'
import { Table } from '../components/Table'
import { TextInput } from '../components/TextInput'
import {
  assigneeListStore,
  MarketingPlannerTaskTableColumns,
  todoListStore,
} from '../constants/tables/MarketingPlannerTaskTableColumns'
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
  const todoList = todoListStore((state) => state.todoList)
  const resetTodoList = todoListStore((state) => state.resetTodoList)
  const clear = assigneeListStore((state) => state.clear)
  const toggleCustomTodoModal = useAddCustomTodoModal((state) => state.toggle)

  const submitForm = async (values: CreateMarketingPlannerForm) => {
    try {
      const { status } = await axios.post<CreateMarketingPlannerForm>(
        `/v1/clients/${session?.user.userType.client.id}/marketing-planners`,
        objectWithFileToFormData({
          ...values,
          todoList: todoList
            .filter(({ selected }) => selected)
            .map(({ name, status, assignee, deadline }) => ({ name, status, assignee, deadline })),
        })
      )

      if (status === 200) {
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
    resetTodoList()
    clear()
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
            todoList: [],
            attachments: [],
          }}
          onSubmit={submitForm}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6 flex justify-center gap-6 lg:flex-col">
                <Card
                  className="h-fit w-130 lg:w-full"
                  title="Step 1: Event Details"
                  titlePosition="center"
                >
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
                    accept={['.gif', '.jpeg', '.mp4', '.png', '.jpg']}
                    multiple
                  />
                </Card>
                <div className="flex-1 space-y-6">
                  <Card
                    title="Step 2: Todo List"
                    titlePosition="center"
                    className="flex max-h-155 flex-col"
                  >
                    <button
                      type="button"
                      className="absolute right-6 flex space-x-2"
                      onClick={toggleCustomTodoModal}
                    >
                      <PlusIcon className="stroke-halloween-orange" />
                      <div className=" text-sm font-semibold text-halloween-orange">
                        Add Assignee
                      </div>
                    </button>
                    <Table
                      columns={MarketingPlannerTaskTableColumns}
                      data={todoList}
                      ofString="Todo List"
                      initialState={{
                        sortBy: [
                          {
                            id: 'selected',
                          },
                        ],
                      }}
                    />
                  </Card>
                  <Card className="ml-auto w-1/2">
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
      <AddCustomTodoModal />
    </>
  )
}

NewMarketingPlannerPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default NewMarketingPlannerPage
