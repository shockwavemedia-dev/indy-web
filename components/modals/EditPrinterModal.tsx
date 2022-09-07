import axios from 'axios'
import { Form, Formik } from 'formik'
import Image from 'next/image'
import { useQueryClient } from 'react-query'
import { EditPrinterSchema } from '../../schemas/EditPrinterFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { EditPrinterForm } from '../../types/forms/EditPrinterForm.type'
import { Printer } from '../../types/Printer.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { FileDropZone } from '../FileDropZone'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { RichTextInput } from '../RichTextInput'
import { TextInput } from '../TextInput'

export const EditPrinterModal = ({
  isVisible,
  onClose,
  printer,
}: {
  isVisible: boolean
  onClose: () => void
  printer: Printer
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const submitForm = async (values: EditPrinterForm) => {
    try {
      const { status } = await axios.post(
        `/v1/printers/${printer.id}`,
        objectWithFileToFormData(values)
      )

      if (status === 200) {
        queryClient.invalidateQueries('printers')
        onClose()
        showToast({
          type: 'success',
          message: 'All changes was successfully saved',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong',
      })
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="Edit Printer" onClose={onClose}>
          <Formik
            validationSchema={EditPrinterSchema}
            initialValues={{
              email: printer.email,
              companyName: printer.companyName,
              contactName: printer.contactName,
              phone: printer.phone,
              description: printer.description,
              companyLogoUrl: printer.companyLogoUrl,
              _method: 'PUT',
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <div className="mb-5 flex space-x-5">
                  {printer.companyLogoUrl && (
                    <div className="rounded-md">
                      <Image
                        src={printer.companyLogoUrl}
                        alt={printer.companyLogoUrl}
                        height={150}
                        width={150}
                      />
                    </div>
                  )}
                  <TextInput
                    label="Company Name"
                    type="text"
                    Icon={EditIcon}
                    placeholder="Enter Company Name"
                    name="companyName"
                    className="mb-5"
                  />
                </div>
                <TextInput
                  label="Email"
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter Email"
                  name="email"
                  className="mb-5"
                />
                <RichTextInput
                  label="Description"
                  Icon={EditIcon}
                  placeholder="Enter Description"
                  name="description"
                  className="mb-5"
                />
                <div className="mb-5 flex space-x-5">
                  <TextInput
                    label="Contact Name"
                    name="contactName"
                    type="text"
                    Icon={EditIcon}
                    placeholder="Enter Contact Name"
                  />
                  <TextInput
                    label="Phone"
                    type="text"
                    Icon={EditIcon}
                    placeholder="Enter Phone"
                    name="phone"
                  />
                </div>
                <FileDropZone
                  label="Upload New Logo"
                  name="file"
                  className="mb-8"
                  maxSize={250}
                  mimeType="image/png"
                  accept={['.jpeg', '.png', '.jpg']}
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
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
