import axios from 'axios'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Checkbox } from '../../components/Checkbox'
import { DateInput } from '../../components/DateInput'
import { FileButton } from '../../components/FileButton'
import { EditIcon } from '../../components/icons/EditIcon'
import { FloppyDiskIcon } from '../../components/icons/FloppyDiskIcon'
import { RichTextInput } from '../../components/RichTextInput'
import { TextInput } from '../../components/TextInput'
import { MarketingMyTaskManagementOptions } from '../../constants/options/MarketingMyTaskManagementOptions'
import { MarketingTodoListOptions } from '../../constants/options/MarketingTodoListOptions'
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
      const { status } = await axios.put<UpdateMarketingPlannerForm>(
        `/v1/marketing-planners/${id}`,
        values
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
            eventName: marketingPlan?.eventName || '',
            description: marketingPlan?.description || '',
            startDate: marketingPlan?.startDate || null,
            endDate: marketingPlan?.endDate || null,
            isRecurring: marketingPlan?.isRecurring || false,
            taskManagement: marketingPlan?.taskManagement || [],
            todoList: marketingPlan?.todoList || [],
            attachments: marketingPlan.attachments,
          }}
          onSubmit={submitForm}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6 flex justify-center gap-6 lg:flex-col">
                <Card className="h-fit flex-1" title="Event Details" titlePosition="center">
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
                <div className="flex gap-6 xl:flex-col lg:flex-row">
                  <Card
                    className="h-fit w-75 space-y-5 rounded-xl lg:w-full"
                    title="Indy To-do List"
                    titlePosition="center"
                  >
                    {MarketingTodoListOptions?.map(({ value, label }) => (
                      <Checkbox key={`${value}-todo`} name="todoList" label={label} value={value} />
                    ))}
                  </Card>
                  <div className="h-fit w-75 lg:w-full">
                    <Card className="mb-6 space-y-5" title="My To-do List" titlePosition="center">
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
                          <div>Update</div>
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
              <Card title="Attachments">
                <div className="flex flex-wrap gap-4">
                  {marketingPlan.attachments && marketingPlan.attachments.length > 0 ? (
                    marketingPlan.attachments.map(({ name, thumbnailUrl, signedUrl }, i) => (
                      <FileButton
                        key={`marketingPlanFile-${i}`}
                        className="h-35 w-35"
                        href={signedUrl}
                        name={name}
                        thumbnailUrl={thumbnailUrl}
                        openNewTab
                      />
                    ))
                  ) : (
                    <div className="m-auto text-base text-metallic-silver">No files found.</div>
                  )}
                </div>
              </Card>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

MarketingPlannerPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default MarketingPlannerPage
