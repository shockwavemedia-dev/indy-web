import camelcaseKeys from 'camelcase-keys'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { MouseEventHandler } from 'react'
import { useQuery } from 'react-query'
import { NewEventForm } from '../../interfaces/NewEventForm.interface'
import { Option } from '../../interfaces/Option.interface'
import { Service } from '../../interfaces/Service.interface'
import { API_BASE_URL } from '../../utils/constants'
import Button from '../Common/Button.component'
import FileInput from '../Common/FileInput.component'
import CalendarIcon from '../Common/Icons/Calendar.icon'
import LightbulbIcon from '../Common/Icons/Lightbulb.icon'
import PencilIcon from '../Common/Icons/Pencil.icon'
import Select from '../Common/Select.component'
import TextAreaInput from '../Common/TextAreaInput.component'
import TextInput from '../Common/TextInput.component'
import Modal from './Modal.component'

const NewEventModalWrapper = ({ onClose }: { onClose: MouseEventHandler<HTMLButtonElement> }) => {
  const { data: session } = useSession()
  const { data: services, isLoading } = useQuery('services', async () => {
    const res = await fetch(
      `${API_BASE_URL}/v1/clients/${session?.user.userType.clientId}/services`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${session?.accessToken}`,
        },
      }
    )

    const { data } = await res.json()

    const services: Array<Service> = camelcaseKeys(data, { deep: true })

    return services.map(({ id }) => {
      return {
        label: id.toString(),
        value: id.toString(),
      } as Option
    })
  })

  const formInitialValues: NewEventForm = {
    title: '',
    service: '',
    date: '',
    taskDescription: '',
    assets: undefined,
  }

  return (
    <Modal title="New Event" onClose={onClose}>
      <Formik initialValues={formInitialValues} onSubmit={() => {}}>
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Form>
              <div className="flex w-[560px] flex-col">
                <div className="mb-[24px]">
                  <TextInput
                    label="Title"
                    Icon={PencilIcon}
                    placeholder="Enter Title"
                    name="title"
                    disableAutoComplete
                  />
                </div>
                <div className="mb-[24px] flex space-x-[12px]">
                  <Select
                    label="Service"
                    placeholder={isLoading ? 'Fetching Services...' : 'Select Services'}
                    Icon={LightbulbIcon}
                    name="service"
                    options={services}
                    isDisabled={isLoading}
                    setFieldValue={setFieldValue}
                  />
                  <TextInput
                    label="Date"
                    Icon={CalendarIcon}
                    placeholder="Enter Date"
                    name="date"
                    disableAutoComplete
                  />
                </div>
                <div className="mb-[24px]">
                  <TextAreaInput
                    label="Task Description"
                    Icon={PencilIcon}
                    placeholder="Enter Task Description"
                    name="taskDescription"
                  />
                </div>
                <div className="mb-[32px]">
                  <FileInput label="Upload Assets" name="assets" />
                </div>
                <div className="flex space-x-[12px]">
                  <Button ariaLabel="Cancel" isLight onClick={onClose}>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}

const NewEventModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
}) => {
  return <>{isVisible && <NewEventModalWrapper onClose={onClose} />}</>
}

export default NewEventModal
