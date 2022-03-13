import { Form, Formik } from 'formik'
import { MouseEventHandler } from 'react'
import { NewProjectBriefForm } from '../../interfaces/NewProjectBriefForm.interface'
import Button from '../Common/Button.component'
import FileInput from '../Common/FileInput.component'
import CalendarIcon from '../Common/Icons/Calendar.icon'
import LightbulbIcon from '../Common/Icons/Lightbulb.icon'
import PencilIcon from '../Common/Icons/Pencil.icon'
import TextAreaInput from '../Common/TextAreaInput.component'
import TextInput from '../Common/TextInput.component'
import Modal from './Modal.component'

const NewEventModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
}) => {
  const formInitialValues: NewProjectBriefForm = {
    service: '',
    date: '',
    briefName: '',
    content: '',
    assets: undefined,
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Project Brief" onClose={onClose}>
          <Formik initialValues={formInitialValues} onSubmit={() => {}}>
            {({ isSubmitting }) => {
              return (
                <Form>
                  <div className="flex w-[560px] flex-col">
                    <div className="mb-[24px] flex space-x-[12px]">
                      <TextInput
                        label="Service"
                        Icon={LightbulbIcon}
                        placeholder="Select Service"
                        name="service"
                      />
                      <TextInput
                        label="Date"
                        Icon={CalendarIcon}
                        placeholder="Enter Date"
                        name="date"
                      />
                    </div>
                    <div className="mb-[24px]">
                      <TextInput
                        label="Brief Name"
                        Icon={PencilIcon}
                        placeholder="Enter Brief Name"
                        name="briefName"
                      />
                    </div>
                    <div className="mb-[24px]">
                      <TextAreaInput
                        label="Content"
                        Icon={PencilIcon}
                        placeholder="Enter Content"
                        name="content"
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
