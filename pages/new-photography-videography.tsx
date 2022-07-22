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
import { DateInput } from '../components/DateInput'
import { ClipboardIcon } from '../components/icons/ClipboardIcon'
import { EditIcon } from '../components/icons/EditIcon'
import { FloppyDiskIcon } from '../components/icons/FloppyDiskIcon'
import { Select } from '../components/Select'
import { TextInput } from '../components/TextInput'
import { ServiceTypeOptions } from '../constants/options/photography-videography/ServiceTypeOptions'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { useToastStore } from '../store/ToastStore'
import { CreatePhotographyVideographyForm } from '../types/forms/CreatePhotographyVideographyForm'
import { MarketingPlanner } from '../types/MarketingPlanner.type'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
import { objectWithFileToFormData } from '../utils/FormHelpers'

const NewPhotographyVideographyPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()
  const { showToast } = useToastStore()
  const { replace } = useRouter()
  const queryClient = useQueryClient()

  const submitForm = async (values: CreatePhotographyVideographyForm) => {
    try {
      const { status } = await axios.post<MarketingPlanner>(
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
              <div className="flex justify-center space-x-6">
                <Card className="w-130" title="Step 1: Select Service" titlePosition="center">
                  <Select
                    name="gender"
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
                  <hr className="mb-6 border-t-bright-gray" />
                </Card>

                <div className="h-fit w-75">
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

NewPhotographyVideographyPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default NewPhotographyVideographyPage
