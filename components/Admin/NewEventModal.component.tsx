import { Form, Formik } from 'formik'
import { MouseEventHandler } from 'react'
import { NewEventForm } from '../../interfaces/NewEventForm.interface'
import Button from '../Common/Button.component'
import FileInput from '../Common/FileInput.component'
import CalendarIcon from '../Common/Icons/Calendar.icon'
import PencilIcon from '../Common/Icons/Pencil.icon'
import TextAreaInput from '../Common/TextAreaInput.component'
import TextInput from '../Common/TextInput.component'
import Modal from './Modal.component'
import SelectService from './SelectService.component'

const NewEventModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
}) => {
  const formInitialValues: NewEventForm = {
    title: '',
    service: [],
    date: '',
    taskDescription: '',
    assets: undefined,
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Event" onClose={onClose}>
          <Formik
            initialValues={formInitialValues}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true)
              alert(JSON.stringify(values))
              setSubmitting(false)
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => {
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
                      <SelectService
                        selectedServices={values.service}
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
      )}
    </>
  )
}

export default NewEventModal
