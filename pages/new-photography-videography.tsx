import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactElement, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Checkbox } from '../components/Checkbox'
import { DateInput } from '../components/DateInput'
import { ClipboardIcon } from '../components/icons/ClipboardIcon'
import { EditIcon } from '../components/icons/EditIcon'
import { FloppyDiskIcon } from '../components/icons/FloppyDiskIcon'
import { UserIcon } from '../components/icons/UserIcon'
import { LinkButton } from '../components/LinkButton'
import { RadioButton } from '../components/RadioButton'
import { RichTextInput } from '../components/RichTextInput'
import { Select } from '../components/Select'
import { TextInput } from '../components/TextInput'
import { TimeInput } from '../components/TimeInput'
import { AccountManagerOptions } from '../constants/options/photography-videography/AccountManagerOptions'
import { BookingTypeOptions } from '../constants/options/photography-videography/BookingTypeOptions'
import { DishesOptions } from '../constants/options/photography-videography/DishesOptions'
import { OutputTypeOptions } from '../constants/options/photography-videography/OutputTypeOptions'
import { ServiceTypeOptions } from '../constants/options/photography-videography/ServiceTypeOptions'
import { ShootTypeOptions } from '../constants/options/photography-videography/ShootTypeOptions'
import { YesOrNoOptions } from '../constants/options/photography-videography/YesOrNoOptions'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { CreatePhotographyVideographyFormSchema } from '../schemas/CreatePhotographyVideographyFormSchema'
import { useToastStore } from '../store/ToastStore'
import { CreatePhotographyVideographyForm } from '../types/forms/CreatePhotographyVideographyForm'
import { Page } from '../types/Page.type'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
import { Photographer } from '../types/Photographer.type'
import { PhotographyVideography } from '../types/PhotographyVideography.type'
import { objectWithFileToFormData } from '../utils/FormHelpers'

const NewPhotographyVideographyPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()
  const { showToast } = useToastStore()
  const { replace } = useRouter()
  const queryClient = useQueryClient()

  const { data: photographers } = useQuery('photographers', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Photographer>
      page: Page
    }>('/v1/photographers')

    return data
  })

  const submitForm = async (values: CreatePhotographyVideographyForm) => {
    try {
      const {
        status,
        data: { id },
      } = await axios.post<PhotographyVideography>(
        `/v1/clients/${session?.user.userType.client.id}/event-bookings`,
        objectWithFileToFormData(values)
      )

      if (status === 200) {
        replace(`/photography-videography/${id}`)
        queryClient.invalidateQueries('eventBookings')
        showToast({
          type: 'success',
          message: `New Event Booking successfully created!`,
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
    setHeader('New Photography/Videography')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - New Photography/Videography</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl">
        <Formik
          initialValues={{
            backdrops: '',
            bookingType: '',
            contactName: '',
            contactNumber: '',
            departmentManager: '',
            eventName: '',
            jobDescription: '',
            location: '',
            numberOfDishes: '',
            outputs: [],
            preferredDueDate: null,
            serviceType: '',
            shootDate: null,
            shootTitle: '',
            startTime: null,
            stylingRequired: '',
            shootType: [] as string[],
            photographer: -1,
          }}
          validationSchema={CreatePhotographyVideographyFormSchema}
          onSubmit={submitForm}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <div className="flex w-full justify-center space-x-6">
                <div className="h-fit w-140">
                  <Card
                    className="mb-8 h-fit w-140"
                    title="Step 1: Select Service"
                    titlePosition="center"
                    titleClassName="text-halloween-orange"
                  >
                    <Select
                      name="serviceType"
                      Icon={ClipboardIcon}
                      placeholder="Select Service"
                      options={ServiceTypeOptions}
                      className="mb-5"
                    />
                    <Select
                      name="photographerId"
                      Icon={UserIcon}
                      placeholder="Select Photographer"
                      options={
                        photographers?.map((photographer) => ({
                          value: photographer.adminUserId,
                          label: photographer.fullName,
                        })) ?? []
                      }
                      className="mb-5"
                    />
                    <div className="mb-5 flex space-x-5">
                      <TextInput
                        type="text"
                        Icon={EditIcon}
                        placeholder="Enter Shoot Title"
                        name="shootTitle"
                        className="mb-5"
                      />
                      <DateInput name="shootDate" placeholder="Select Shoot Date" />
                    </div>
                  </Card>
                  <Card
                    className="h-fit w-140"
                    title="Step 2: Basic Details"
                    titlePosition="center"
                    titleClassName="text-halloween-orange"
                  >
                    <TextInput
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Event Name"
                      name="eventName"
                      className="mb-5"
                    />
                    <Select
                      name="bookingType"
                      Icon={ClipboardIcon}
                      placeholder="Booking Type"
                      options={BookingTypeOptions}
                      className="mb-5"
                    />
                    <TextInput
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Location"
                      name="location"
                      className="mb-5"
                    />
                    <div className="mb-5 flex space-x-5">
                      <TextInput
                        type="text"
                        Icon={EditIcon}
                        placeholder="Enter Contact Name"
                        name="contactName"
                      />
                      <TextInput
                        type="text"
                        Icon={EditIcon}
                        placeholder="Enter Contact Number"
                        name="contactNumber"
                      />
                    </div>
                    <Select
                      name="departmentManager"
                      Icon={UserIcon}
                      placeholder="Select Account Manager"
                      options={AccountManagerOptions}
                      className="mb-5"
                    />
                    <div className="mb-5 flex space-x-5">
                      <TimeInput name="startTime" placeholder="Start Time" />
                      <DateInput name="preferredDueDate" placeholder="Preferred Due Date" />
                    </div>
                  </Card>
                </div>
                <div className="h-fit w-140">
                  <Card
                    className="mb-8 space-y-5"
                    title="Step 3: Job Description"
                    titlePosition="center"
                    titleClassName="text-halloween-orange"
                  >
                    <div className="mb-5">
                      <RichTextInput
                        Icon={EditIcon}
                        placeholder="Describe the Shoot"
                        name="jobDescription"
                        className="h-40"
                      />
                    </div>
                  </Card>
                  <Card
                    className="mb-6 space-y-5"
                    title=" Step 4: Type of Shoot"
                    titlePosition="center"
                    titleClassName="text-halloween-orange"
                  >
                    {ShootTypeOptions?.map(({ value, label }) => (
                      <Checkbox
                        key={`${value}-shoot-type`}
                        name="shootType"
                        label={label}
                        value={value}
                        onChange={
                          value === 'Food Photography'
                            ? ({ currentTarget: { checked } }: ChangeEvent<HTMLInputElement>) => {
                                if (!checked) {
                                  setFieldValue('backdrops', null)
                                  setFieldValue('stylingRequired', null)
                                  setFieldValue('numberOfDishes', null)
                                }
                              }
                            : undefined
                        }
                      />
                    ))}
                    {values.shootType && values.shootType.includes('Food Photography') && (
                      <div className="mb-8">
                        <Select
                          name="numberOfDishes"
                          Icon={ClipboardIcon}
                          placeholder="Number Of Dishes"
                          options={DishesOptions}
                          className="mb-5"
                        />
                        <div className="mb-5 flex space-x-5">
                          <div className=" text-sm font-medium text-metallic-silver">
                            Styling Required
                          </div>
                          {YesOrNoOptions?.map(({ value, label }) => (
                            <RadioButton
                              key={`${value}-styling-required`}
                              name="stylingRequired"
                              label={label}
                              value={value}
                            />
                          ))}
                        </div>
                        <div className="mb-5 flex space-x-5">
                          <div className=" text-sm font-medium text-metallic-silver">Backdrops</div>
                          {YesOrNoOptions?.map(({ value, label }) => (
                            <RadioButton
                              key={`${value}-backdrops`}
                              name="backdrops"
                              label={label}
                              value={value}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                  <Card
                    className="mb-8 space-y-5"
                    title="Step 5: Outputs"
                    titlePosition="center"
                    titleClassName="text-halloween-orange"
                  >
                    {OutputTypeOptions?.map(({ value, label }) => (
                      <Checkbox
                        key={`${value}-output`}
                        name="outputs"
                        label={label}
                        value={value}
                      />
                    ))}
                  </Card>
                  <Card>
                    <div className="flex space-x-5">
                      <LinkButton title="Cancel" href="/photography-videography" light />
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

NewPhotographyVideographyPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default NewPhotographyVideographyPage
