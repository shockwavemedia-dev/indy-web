import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQuery, useQueryClient } from 'react-query'
import { PropsValue } from 'react-select'
import { CreateEventFormSchema } from '../../../schemas/CreateEventFormSchema'
import { CreateEventForm } from '../../../types/forms/CreateEventForm.type'
import { Page } from '../../../types/Page.type'
import { SelectOption } from '../../../types/SelectOption.type'
import { Service } from '../../../types/Service.type'
import { objectWithFileToFormData } from '../../../utils/FormHelpers'
import { isMultiValue } from '../../../utils/SelectHelpers'
import Button from '../../common/Button'
import DateInput from '../../common/DateInput'
import FileInput from '../../common/FileInput'
import ClipboardIcon from '../../common/icons/ClipboardIcon'
import EditIcon from '../../common/icons/EditIcon'
import RichTextInput from '../../common/RichTextInput'
import Select from '../../common/Select'
import TextInput from '../../common/TextInput'
import Modal from '../Modal'
import CreateLinkModal from './CreateLinkModal'

const CreateEventModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const { data: services } = useQuery('services', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Service>
      page: Page
    }>(`/v1/clients/${session?.user.userType.clientId}/services`)

    return data
  })

  const formInitialValues: CreateEventForm = {
    requestedBy: session?.user.id || -1,
    clientId: session?.user.userType.clientId || -1,
    subject: '',
    services: [],
    duedate: null,
    description: '',
  }

  const submitForm = async (
    values: CreateEventForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/v1/tickets/event', objectWithFileToFormData(values))

    if (status === 200) {
      queryClient.invalidateQueries('tickets')
      onClose()
    }

    setSubmitting(false)
  }

  const selectService = (option: PropsValue<SelectOption<Service>>) => {
    if (isMultiValue(option)) {
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="Create Event" onClose={onClose}>
          <Formik
            validationSchema={CreateEventFormSchema}
            initialValues={formInitialValues}
            onSubmit={submitForm}
          >
            <Form className="flex w-140 flex-col">
              <TextInput
                type="text"
                Icon={EditIcon}
                placeholder="Enter subject"
                name="subject"
                className="mb-5"
              />
              <div className="mb-5 flex space-x-5">
                {/* <SelectService name="services" /> */}
                <Select
                  Icon={ClipboardIcon}
                  placeholder="Select services"
                  options={
                    services?.map((service) => ({
                      label: service.serviceName,
                      value: service,
                    })) || []
                  }
                  onChange={selectService}
                  isMulti
                />
                <DateInput name="duedate" placeholder="Enter due date" />
              </div>
              <RichTextInput
                Icon={EditIcon}
                placeholder="Enter description"
                name="description"
                className="mb-5"
              />
              <FileInput label="Upload Assets" name="attachment" className="mb-8" />
              <div className="flex space-x-5">
                <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                  Cancel
                </Button>
                <Button ariaLabel="Submit" disabled={false} type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal>
      )}
      <CreateLinkModal />
    </>
  )
}

export default CreateEventModal
