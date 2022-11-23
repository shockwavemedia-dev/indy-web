import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQuery, useQueryClient } from 'react-query'
import { ClientRatingOptions } from '../../constants/options/ClientRatingOptions'
import { TimezoneOptions } from '../../constants/options/TimezoneOptions'
import { NewClientFormSchema } from '../../schemas/NewClientFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { NewClientForm } from '../../types/forms/NewClientForm.type'
import { Staff } from '../../types/Staff.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { DateInput } from '../DateInput'
import { FileDropZone } from '../FileDropZone'
import { ClockIcon } from '../icons/ClockIcon'
import { EditIcon } from '../icons/EditIcon'
import { UserIcon } from '../icons/UserIcon'
import { Modal } from '../Modal'
import { RichTextInput } from '../RichTextInput'
import { Select } from '../Select'
import { TextInput } from '../TextInput'

export const NewClientModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const { data: graphicDesigners } = useQuery(['staffs', 15], async () => {
    const { data } = await axios.get<Array<Staff>>('/v1/departments/15/staffs')

    return data
  })

  const submitForm = async (values: NewClientForm) => {
    try {
      const { status } = await axios.post('/v1/clients', objectWithFileToFormData(values))

      if (status === 200) {
        queryClient.invalidateQueries('clients')
        onClose()
        showToast({
          type: 'success',
          message: 'New Client successfully created!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: get422And400ResponseError(e),
      })
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Client" onClose={onClose}>
          <Formik
            validationSchema={NewClientFormSchema}
            initialValues={{
              name: '',
              clientCode: '',
              logo: null,
              address: '',
              phone: '',
              timezone: '',
              overview: '',
              clientSince: null,
              rating: null,
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex w-140 flex-col">
                  <div className="mb-5 flex space-x-5">
                    <TextInput
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Company Name"
                      name="name"
                    />
                  </div>
                  <RichTextInput
                    Icon={EditIcon}
                    placeholder="Enter Overview"
                    name="overview"
                    className="mb-5"
                  />
                  <div className="mb-5 flex space-x-5">
                    <TextInput
                      name="address"
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Address"
                    />
                    <TextInput type="text" Icon={EditIcon} placeholder="Enter Phone" name="phone" />
                  </div>
                  <div className="mb-5 flex space-x-5">
                    <Select
                      name="timezone"
                      Icon={ClockIcon}
                      placeholder="Enter Timezone"
                      options={TimezoneOptions}
                    />
                    <DateInput name="clientSince" placeholder="Enter Client Since" />
                  </div>
                  <div className="mb-5 flex space-x-5">
                    <Select
                      name="rating"
                      Icon={EditIcon}
                      placeholder="Select Rating"
                      options={ClientRatingOptions}
                    />
                    <Select
                      name="designatedDesignerId"
                      Icon={UserIcon}
                      placeholder="Enter designated designer"
                      options={
                        graphicDesigners?.map(({ fullName, adminUserId }) => ({
                          label: fullName,
                          value: adminUserId,
                        })) ?? []
                      }
                    />
                  </div>
                  <FileDropZone
                    label="Logo"
                    name="logo"
                    accept={['.jpeg', '.png', '.jpg']}
                    maxSize={5}
                    mimeType="image/png"
                    className="mb-8"
                  />
                  <div className="flex space-x-5">
                    <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                      Cancel
                    </Button>
                    <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  )
}
