import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { MouseEventHandler } from 'react'
import { useQuery } from 'react-query'
import { TicketTypeOptions } from "../../constants/TicketTypeOptions"
import { SupportRequestForm } from '../../interfaces/SupportRequestForm.interface'
import Button from '../Common/Button.component'
import CalendarIcon from '../Common/Icons/Calendar.icon'
import ClipboardIcon from '../Common/Icons/Clipboard.icon'
import EditIcon from '../Common/Icons/Edit.icon'
import LightbulbIcon from '../Common/Lightbulb.icon'
import Select from '../Common/Select.component'
import TextAreaInput from '../Common/TextAreaInput.component'
import TextInput from '../Common/TextInput.component'
import Modal from './Modal.component'


const SupportRequestModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
}) => {
  const { data: session } = useSession()

  const formInitialValues: SupportRequestForm = {
    subject: '',
    description: '',
    type: '',
    requestedBy: session!.user.id,
    clientId: session!.user.userType.clientId,
    departmentId: 1,
    duedate: ''
  }

  const typeOptions = TicketTypeOptions

  const { data: departments } = useQuery('departments', async () => {
    const { data } = await axios.get(
        `/v1/departments`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
    )
    return data
   })

  const departmentOptions = departments?.map((department) => {
  return { value: department.id, label: department.name };
  });

  const submitForm = async (
    values: SupportRequestForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
) => {
  setSubmitting(true)

  await axios.post('/v1/tickets', values, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })

  setSubmitting(false)
}

  return (
    <>
      {isVisible && (
        <Modal title="Support Request" onClose={onClose}>
          <Formik initialValues={formInitialValues} onSubmit={submitForm}>
            {({ isSubmitting,setFieldValue }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  Icon={EditIcon}
                  placeholder="Enter Subject"
                  name="subject"
                  className="mb-8"
                />
                <Select
                 name="type"
                 Icon={LightbulbIcon}
                 placeholder="Select Type"
                 options={typeOptions}
                 setFieldValue={setFieldValue}
                 className="mb-5"
                  />
                <TextInput
                  Icon={CalendarIcon}
                  placeholder="Enter due date"
                  name="duedate"
                  disableAutoComplete
                  className="mb-5"
                />
                <Select
                  name="department"
                  Icon={ClipboardIcon}
                  placeholder="Select department"
                  options={departmentOptions}
                  setFieldValue={setFieldValue}
                  className="mb-5"
                />
                <TextAreaInput
                  Icon={EditIcon}
                  placeholder="Enter Description"
                  name="description"
                  className="mb-8"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" light onClick={onClose}>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  )
}

export default SupportRequestModal
