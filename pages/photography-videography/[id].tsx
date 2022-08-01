import axios from 'axios'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactElement, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Checkbox } from '../../components/Checkbox'
import { DateInput } from '../../components/DateInput'
import { ClipboardIcon } from '../../components/icons/ClipboardIcon'
import { EditIcon } from '../../components/icons/EditIcon'
import { FloppyDiskIcon } from '../../components/icons/FloppyDiskIcon'
import { PlusIcon } from '../../components/icons/PlusIcon'
import { UserIcon } from '../../components/icons/UserIcon'
import {
  FileDisplayModal,
  useFileDisplayModalStore,
} from '../../components/modals/FileDisplayModal'
import {
  UploadPhotoVideoFileModal,
  useUploadPhotoVideoFileModalStore,
} from '../../components/modals/UploadPhotoVideoFileModal'
import { PhotographyVideographyFileButton } from '../../components/PhotographyVideographyFileButton'
import { RadioButton } from '../../components/RadioButton'
import { RichTextInput } from '../../components/RichTextInput'
import { Select } from '../../components/Select'
import { TextInput } from '../../components/TextInput'
import { TimeInput } from '../../components/TimeInput'
import { AccountManagerOptions } from '../../constants/options/photography-videography/AccountManagerOptions'
import { BookingTypeOptions } from '../../constants/options/photography-videography/BookingTypeOptions'
import { DishesOptions } from '../../constants/options/photography-videography/DishesOptions'
import { OutputTypeOptions } from '../../constants/options/photography-videography/OutputTypeOptions'
import { ServiceTypeOptions } from '../../constants/options/photography-videography/ServiceTypeOptions'
import { ShootTypeOptions } from '../../constants/options/photography-videography/ShootTypeOptions'
import { YesOrNoOptions } from '../../constants/options/photography-videography/YesOrNoOptions'
import PanelLayout, { usePanelLayoutStore } from '../../layouts/PanelLayout'
import { EditPhotographyVideographyFormSchema } from '../../schemas/EditPhotographyVideographyFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { EditPhotographyVideographyForm } from '../../types/forms/EditPhotographyVideographyForm'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'
import { PhotographyVideography } from '../../types/PhotographyVideography.type'

const PhotographyVideographyPage: NextPageWithLayout = () => {
  const {
    query: { id },
  } = useRouter()
  const { setHeader } = usePanelLayoutStore()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { toggleUploadPhotoVideoFileModal } = useUploadPhotoVideoFileModalStore()
  const { toggleShowPhotoVideoFileModal } = useFileDisplayModalStore()

  const { data: booking } = useQuery(
    ['eventBookings', Number(id)],
    async () => {
      const { data } = await axios.get<PhotographyVideography>(`/v1/event-bookings/${id}`)

      return data
    },
    {
      enabled: !!id,
    }
  )

  useEffect(() => {
    if (booking) {
      setHeader(booking.eventName)
    }
  }, [booking])

  const submitForm = async (values: EditPhotographyVideographyForm) => {
    try {
      const { status } = await axios.put(`/v1/event-bookings/${id}`, values)

      if (status === 200) {
        queryClient.invalidateQueries('eventBookings')
        showToast({
          type: 'success',
          message: `All changes was successfully saved!`,
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong! 😵',
      })
    }
  }

  if (!booking) return null

  return (
    <>
      {booking && (
        <div className="mx-auto w-full max-w-8xl">
          <Formik
            initialValues={{
              backdrops: booking?.backdrops,
              bookingType: booking?.bookingType,
              contactName: booking?.contactName,
              contactNumber: booking?.contactNumber,
              departmentManager: booking?.departmentManager,
              eventName: booking?.eventName,
              jobDescription: booking?.jobDescription,
              location: booking?.location,
              numberOfDishes: booking?.numberOfDishes,
              outputs: booking?.outputs,
              preferredDueDate: booking?.preferredDueDate,
              serviceType: booking?.serviceType,
              shootDate: booking?.shootDate,
              startTime: booking?.startTime,
              shootTitle: booking?.shootTitle,
              stylingRequired: booking?.stylingRequired,
              shootType: booking?.shootType as string[],
            }}
            validationSchema={EditPhotographyVideographyFormSchema}
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
                        defaultValue={ServiceTypeOptions.find(
                          ({ value }) => value === booking.serviceType
                        )}
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
                      className="mb-8 h-fit w-140"
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
                        defaultValue={BookingTypeOptions.find(
                          ({ value }) => value === booking.bookingType
                        )}
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
                        defaultValue={AccountManagerOptions.find(
                          ({ value }) => value === booking.departmentManager
                        )}
                        className="mb-5"
                      />
                      <div className="mb-5 flex space-x-5">
                        <TimeInput name="startTime" placeholder="Start Time" />
                        <DateInput name="preferredDueDate" placeholder="Preferred Due Date" />
                      </div>
                    </Card>
                    <Card
                      title="Files"
                      titlePosition="center"
                      titleClassName="text-halloween-orange"
                    >
                      <button
                        className="absolute top-6 right-6 flex space-x-2"
                        type="button"
                        onClick={toggleUploadPhotoVideoFileModal}
                      >
                        <PlusIcon className="stroke-halloween-orange" />
                        <div className=" text-sm font-semibold text-halloween-orange">
                          Upload File
                        </div>
                      </button>
                      <div className="flex flex-wrap gap-4">
                        {!!booking.files ? (
                          booking.files.map(
                            ({ id, originalFilename, url, thumbnailUrl, fileType }) => {
                              const toggleFile = () =>
                                toggleShowPhotoVideoFileModal(url, fileType, originalFilename)

                              return (
                                <>
                                  <PhotographyVideographyFileButton
                                    key={`ticketFile-${id}`}
                                    className="h-35 w-35"
                                    url={url}
                                    fileType={fileType}
                                    name={originalFilename}
                                    thumbnailUrl={thumbnailUrl}
                                    onClick={toggleFile}
                                  />
                                </>
                              )
                            }
                          )
                        ) : (
                          <div className="m-auto text-base text-metallic-silver">
                            No files found.
                          </div>
                        )}
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
                      {values.shootType.includes('Food Photography') && (
                        <div className="mb-8">
                          <Select
                            name="numberOfDishes"
                            Icon={ClipboardIcon}
                            placeholder="Number Of Dishes"
                            options={DishesOptions}
                            defaultValue={
                              values.numberOfDishes
                                ? {
                                    label: values.numberOfDishes,
                                    value: values.numberOfDishes,
                                  }
                                : undefined
                            }
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
                            <div className=" text-sm font-medium text-metallic-silver">
                              Backdrops
                            </div>
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
                        <Link href="/photography-videography">
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
              </Form>
            )}
          </Formik>
        </div>
      )}
      <UploadPhotoVideoFileModal bookingId={Number(id)} />
      <FileDisplayModal />
    </>
  )
}

PhotographyVideographyPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default PhotographyVideographyPage
