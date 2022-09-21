import axios from 'axios'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Checkbox } from '../../components/Checkbox'
import { DateInput } from '../../components/DateInput'
import { FileButton } from '../../components/FileButton'
import { EditIcon } from '../../components/icons/EditIcon'
import { FloppyDiskIcon } from '../../components/icons/FloppyDiskIcon'
import { PlusIcon } from '../../components/icons/PlusIcon'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { LinkButton } from '../../components/LinkButton'
import { MarketingPlannerTaskTable } from '../../components/MarketingPlannerTaskTable'
import {
  AddCustomTodoModal,
  useAddCustomTodoModal,
} from '../../components/modals/AddCustomTodoModal'
import { DeleteMarketingPlannerModal } from '../../components/modals/DeleteMarketingPlannerModal'
import {
  FileDisplayModal,
  useFileDisplayModalStore,
} from '../../components/modals/FileDisplayModal'
import { RichTextInput } from '../../components/RichTextInput'
import { TextInput } from '../../components/TextInput'
import {
  assigneeListStore,
  MarketingPlannerTaskTableColumns,
  todoListStore,
} from '../../constants/tables/MarketingPlannerTaskTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../../layouts/PanelLayout'
import { UpdateMarketingPlannerFormSchema } from '../../schemas/UpdateMarketingPlannerFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { UpdateMarketingPlannerForm } from '../../types/forms/UpdateMarketingPlannerForm.type'
import { MarketingPlanner } from '../../types/MarketingPlanner.type'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const MarketingPlannerPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { showToast } = useToastStore()
  const queryClient = useQueryClient()
  const {
    query: { id },
  } = useRouter()
  const todoList = todoListStore((state) => state.todoList)
  const cleanTodoList = todoListStore((state) => state.cleanTodoList)
  const update = assigneeListStore((state) => state.update)
  const toggleCustomTodoModal = useAddCustomTodoModal((state) => state.toggle)
  const toggleShowPhotoVideoFileModal = useFileDisplayModalStore(
    (state) => state.toggleShowPhotoVideoFileModal
  )

  const [todoLoaded, setTodoLoaded] = useState(false)

  const [isDeleteMarketingPlannerModalVisible, setDeleteMarketingPlannerModalVisible] =
    useState(false)

  const toggleDeleteMarketingPlannerModal = () =>
    setDeleteMarketingPlannerModalVisible(!isDeleteMarketingPlannerModalVisible)

  const { data: marketingPlan } = useQuery(
    ['marketingPlanner', Number(id)],
    async () => {
      const { data } = await axios.get<MarketingPlanner>(`/v1/marketing-planners/${id}`)
      return data
    },
    {
      enabled: !!id,
    }
  )

  const submitForm = async (values: UpdateMarketingPlannerForm) => {
    try {
      setTodoLoaded(false)
      const { status } = await axios.put<UpdateMarketingPlannerForm>(
        `/v1/marketing-planners/${id}`,
        {
          ...values,
          todoList: todoList
            .filter(({ selected }) => selected)
            .map(({ id, name, status, assignee, deadline, notify }) => ({
              id,
              name,
              status,
              assignee,
              deadline,
              notify,
            })),
        }
      )

      if (status === 200) {
        queryClient.invalidateQueries('marketingPlanner')
        showToast({
          type: 'success',
          message: `New Marketing Planner successfully updated!`,
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
    if (marketingPlan) {
      setHeader(marketingPlan.eventName)

      if (!todoLoaded) {
        cleanTodoList(marketingPlan.todoList)
        update(
          Array.from(
            new Set(
              marketingPlan.todoList
                .map(({ assignee }) => assignee)
                .filter((assignee) => !!assignee)
            )
          )
        )
        setTodoLoaded(true)
      }
    }
  }, [marketingPlan])

  if (!marketingPlan) return null

  return (
    <>
      <Head>
        <title>{`Indy - ${marketingPlan?.eventName}`}</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl">
        <Formik
          validationSchema={UpdateMarketingPlannerFormSchema}
          initialValues={{
            eventName: marketingPlan.eventName,
            description: marketingPlan.description,
            startDate: marketingPlan.startDate,
            endDate: marketingPlan.endDate,
            isRecurring: marketingPlan.isRecurring,
            todoList: [],
            attachments: marketingPlan.attachments,
          }}
          onSubmit={submitForm}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6 flex justify-center gap-6 lg:flex-col">
                <Card
                  className="h-fit w-130 lg:w-full"
                  title="Event Details"
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
                </Card>
                <div className="flex-1 space-y-6 lg:w-full">
                  <Card
                    title="Todo List"
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
                        Add Custom Task
                      </div>
                    </button>
                    <MarketingPlannerTaskTable
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
                  <Card className="ml-auto w-3/4 lg:w-full">
                    <div className="flex space-x-5">
                      <LinkButton title="Cancel" href="/marketing-planner" light />
                      <Button
                        ariaLabel="Submit"
                        onClick={toggleDeleteMarketingPlannerModal}
                        type="button"
                        light
                      >
                        <TrashIcon className="stroke-onyx" />
                        <div>Delete</div>
                      </Button>
                      <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                        <FloppyDiskIcon className="stroke-white" />
                        <div>Update</div>
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
              <Card title="Attachments">
                <div className="flex flex-wrap gap-4">
                  {marketingPlan.attachments && marketingPlan.attachments.length > 0 ? (
                    marketingPlan.attachments.map(
                      ({ generatedName, name, thumbnailUrl, fileType, signedUrl }) => (
                        <FileButton
                          key={generatedName}
                          name={name}
                          thumbnailUrl={thumbnailUrl}
                          onClick={() => toggleShowPhotoVideoFileModal(signedUrl, fileType, name)}
                          file
                        />
                      )
                    )
                  ) : (
                    <div className="m-auto text-base text-metallic-silver">No files found.</div>
                  )}
                </div>
              </Card>
            </Form>
          )}
        </Formik>
      </div>
      <DeleteMarketingPlannerModal
        isVisible={isDeleteMarketingPlannerModalVisible}
        onClose={toggleDeleteMarketingPlannerModal}
        id={marketingPlan.id}
        eventName={marketingPlan.eventName}
      />
      <AddCustomTodoModal />
      <FileDisplayModal />
    </>
  )
}

MarketingPlannerPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default MarketingPlannerPage
