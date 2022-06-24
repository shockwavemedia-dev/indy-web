import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQuery, useQueryClient } from 'react-query'
import { EditAnimationFormSchema } from '../../schemas/EditAnimationFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { Animation } from '../../types/Animation.type'
import { AnimationCategory } from '../../types/AnimationCategory.type'
import { EditAnimationForm } from '../../types/forms/EditAnimationForm.type'
import { Page } from '../../types/Page.type'
import { Button } from '../Button'
import { FileDropZone } from '../FileDropZone'
import { FloppyDiskIcon } from '../icons/FloppyDiskIcon'
import { PencilIcon } from '../icons/PencilIcon'
import { Modal } from '../Modal'
import { Select } from '../Select'
import { TextInput } from '../TextInput'

export const EditAnimationModal = ({
  isVisible,
  onClose,
  animation,
}: {
  isVisible: boolean
  onClose: () => void
  animation: Animation
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const { data: categories } = useQuery(
    'clients',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<AnimationCategory>
        page: Page
      }>('/v1/library-categories')

      return data
    },
    {
      enabled: isVisible,
    }
  )

  const categoryOptions = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const submitForm = async (values: EditAnimationForm) => {
    try {
      const { status } = await axios.put(`/v1/libraries/${animation.id}`, values)

      if (status === 200) {
        queryClient.invalidateQueries('animations')
        queryClient.invalidateQueries(['animations', animation.id])
        onClose()
        showToast({
          type: 'success',
          message: 'All changes was successfully saved',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong! 😵',
      })
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="Edit Animation" onClose={onClose}>
          <Formik
            initialValues={{
              title: animation.title,
              description: animation.description,
              libraryCategoryId: animation.libraryCategoryId,
              file: animation.file,
            }}
            validationSchema={EditAnimationFormSchema}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-270 space-x-6">
                <div className="space-y-6">
                  <div className="flex w-130">
                    <video muted autoPlay loop>
                      <source src={animation.videoLink} />
                    </video>
                  </div>
                </div>
                <div className="w-full space-y-5">
                  <TextInput
                    type="text"
                    Icon={PencilIcon}
                    placeholder="Animation Title"
                    name="title"
                    className="mb-5"
                  />
                  {categoryOptions && categoryOptions.length > 0 && (
                    <Select
                      name="libraryCategoryId"
                      Icon={PencilIcon}
                      placeholder="Select Category Animation"
                      className="mb-5"
                      options={categoryOptions}
                      defaultValue={categoryOptions.find(
                        ({ value }) => value === animation.libraryCategoryId
                      )}
                    />
                  )}
                  <TextInput
                    type="text"
                    Icon={PencilIcon}
                    placeholder="Description"
                    name="description"
                    className="mb-5"
                  />
                  <FileDropZone
                    label="Upload Assets"
                    name="file"
                    className="mb-8"
                    maxSize={250}
                    mimeType="video/mp4"
                    accept={['.mp4']}
                  />
                  <div className="flex space-x-5">
                    <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                      Cancel
                    </Button>
                    <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                      <FloppyDiskIcon className="stroke-white" />
                      <div>Save</div>
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
