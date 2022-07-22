import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Checkbox } from '../components/Checkbox'
import { DateInput } from '../components/DateInput'
import { ClipboardIcon } from '../components/icons/ClipboardIcon'
import { EditIcon } from '../components/icons/EditIcon'
import { FloppyDiskIcon } from '../components/icons/FloppyDiskIcon'
import { UserIcon } from '../components/icons/UserIcon'
import { RichTextInput } from '../components/RichTextInput'
import { Select } from '../components/Select'
import { TextInput } from '../components/TextInput'
import { BookingTypeOptions } from '../constants/options/photography-videography/BookingTypeOptions'
import { DishesOptions } from '../constants/options/photography-videography/DishesOptions'
import { OutputTypeOptions } from '../constants/options/photography-videography/OutputTypeOptions'
import { ServiceTypeOptions } from '../constants/options/photography-videography/ServiceTypeOptions'
import { ShootTypeOptions } from '../constants/options/photography-videography/ShootTypeOptions'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { useToastStore } from '../store/ToastStore'
import { Department } from '../types/Department.type'
import { CreatePhotographyVideographyForm } from '../types/forms/CreatePhotographyVideographyForm'
import { Page } from '../types/Page.type'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
import { PhotographyVideography } from '../types/PhotographyVideography.type'
import { objectWithFileToFormData } from '../utils/FormHelpers'

const NewPhotographyVideographyPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()
  const { showToast } = useToastStore()
  const { replace } = useRouter()
  const queryClient = useQueryClient()

  const [showFoodPhotography, setFoodPhotography] = useState(false)

  const toggleTypeOfShoot = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (value === 'Food Photography') {
      toggleFoodPhotography()
    }
  }

  const toggleFoodPhotography = () => setFoodPhotography(!showFoodPhotography)

  const { data: departments } = useQuery('departmentsWithUsers', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Department>
      page: Page
    }>('/v1/departments/staff-list', {
      params: {
        size: 100,
      },
    })

    return data
  })

  const submitForm = async (values: CreatePhotographyVideographyForm) => {
    try {
      const { status } = await axios.post<PhotographyVideography>(
        `/v1/clients/${session?.user.userType.clientId}/event-bookings`,
        objectWithFileToFormData(values)
      )

      if (status === 201) {
        queryClient.invalidateQueries('eventBookings')
        replace('/dashboard')
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
            departmentManager: -1,
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
            shootType: [],
          }}
          onSubmit={submitForm}
        >
          {({ isSubmitting }) => (
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
                        name="shootTitle"
                      />
                    </div>
                    <Select
                      name="departmentManager"
                      Icon={UserIcon}
                      placeholder="Select Account Manager"
                      options={
                        departments
                          ?.find(({ id }) => id === 1)
                          ?.users?.map(({ adminUserId, firstName, lastName }) => ({
                            label: `${firstName} ${lastName}`,
                            value: adminUserId,
                          })) || []
                      }
                      className="mb-5"
                    />
                    <div className="mb-5 flex space-x-5">
                      <DateInput name="startTime" placeholder="Start Date" />
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
                        onChange={toggleTypeOfShoot}
                      />
                    ))}
                    {showFoodPhotography && (
                      <div className="mb-8">
                        <Select
                          name="numberOfDishes"
                          Icon={ClipboardIcon}
                          placeholder="Number Of Dishes"
                          options={DishesOptions}
                          className="mb-5"
                        />
                        <Select
                          name="stylingRequired"
                          Icon={ClipboardIcon}
                          placeholder="Styling Required"
                          options={DishesOptions}
                          className="mb-5"
                        />
                        <Select
                          name="backdrops"
                          Icon={ClipboardIcon}
                          placeholder="Backdrops"
                          options={DishesOptions}
                          className="mb-5"
                        />
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
                      <Link href="/dashboard">
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

NewPhotographyVideographyPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default NewPhotographyVideographyPage
