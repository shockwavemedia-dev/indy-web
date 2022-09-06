import axios from 'axios'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Checkbox } from '../../components/Checkbox'
import { DateInput } from '../../components/DateInput'
import { FileDropZone } from '../../components/FileDropZone'
import { ClipboardIcon } from '../../components/icons/ClipboardIcon'
import { EditIcon } from '../../components/icons/EditIcon'
import { FloppyDiskIcon } from '../../components/icons/FloppyDiskIcon'
import {
  FileDisplayModal,
  useFileDisplayModalStore,
} from '../../components/modals/FileDisplayModal'
import { PhotographyVideographyFileButton } from '../../components/PhotographyVideographyFileButton'
import { Select } from '../../components/Select'
import { TextInput } from '../../components/TextInput'
import { TimeInput } from '../../components/TimeInput'
import { SocialMediaChannelOptions } from '../../constants/options/SocialMediaChannelOptions'
import { SocialMediaStatusOptions } from '../../constants/options/SocialMediaStatusOptions'
import PanelLayout, { usePanelLayoutStore } from '../../layouts/PanelLayout'
import { CreateSocialMediaFormSchema } from '../../schemas/CreateSocialMediaFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { EditSocialMediaForm } from '../../types/forms/EditSocialMediaForm.type'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'
import { SocialMedia } from '../../types/SocialMedia.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'

const SocialMediaPage: NextPageWithLayout = () => {
  const {
    query: { id },
  } = useRouter()
  const { setHeader } = usePanelLayoutStore()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { toggleShowPhotoVideoFileModal } = useFileDisplayModalStore()

  const { data: socialMedia } = useQuery(
    ['socialMedia', Number(id)],
    async () => {
      const { data } = await axios.get<SocialMedia>(`/v1/social-media/${id}`)

      return data
    },
    {
      enabled: !!id,
    }
  )
  console.log(socialMedia)
  useEffect(() => {
    if (socialMedia) {
      setHeader(socialMedia.post)
    }
  }, [socialMedia])

  const submitForm = async (values: EditSocialMediaForm) => {
    if (values.postDate && values.postTime) {
      const postDate = new Date(values.postDate)
      const postTime = new Date(values.postTime)
      const postDateTime = Date.UTC(
        postDate.getUTCFullYear(),
        postDate.getUTCMonth(),
        postDate.getUTCDate(),
        postTime.getUTCHours(),
        postTime.getUTCMinutes(),
        postTime.getUTCSeconds()
      )

      values.postDate = values.postTime = new Date(postDateTime)
    }
    try {
      const { status } = await axios.post(
        `/v1/social-media/${id}`,
        objectWithFileToFormData(values)
      )

      if (status === 200) {
        queryClient.invalidateQueries('socialMedia')
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

  if (!socialMedia) return null

  return (
    <>
      {socialMedia && (
        <div className="mx-auto w-full max-w-8xl">
          <Formik
            initialValues={{
              post: socialMedia.post,
              attachments: socialMedia?.attachments,
              copy: socialMedia?.copy,
              status: socialMedia.status,
              channels: socialMedia?.channels,
              notes: socialMedia?.notes,
              postDate: socialMedia?.postDate,
              postTime: socialMedia?.postDate,
              _method: 'PUT',
            }}
            validationSchema={CreateSocialMediaFormSchema}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex w-full">
                  <Card className="h-fit w-9/12">
                    <TextInput
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Post Topic"
                      label="Post Topic"
                      name="post"
                      className="mb-5"
                    />
                    <div className="mb-5 flex space-x-5">
                      <TimeInput name="postTime" placeholder="Select Time" label="Post Time" />
                      <DateInput name="postDate" placeholder="Select Post Date" label="Post Date" />
                    </div>
                    <TextInput
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Copy"
                      name="copy"
                      label="Copy"
                      className="mb-5"
                    />
                    <Select
                      label="Status"
                      name="status"
                      Icon={ClipboardIcon}
                      options={SocialMediaStatusOptions}
                      defaultValue={SocialMediaStatusOptions.find(
                        ({ value }) => value === socialMedia.status
                      )}
                      className="mb-5"
                    />
                    <label className="mb-2 inline-block text-xs font-medium text-metallic-silver">
                      Select Channels
                    </label>
                    {SocialMediaChannelOptions?.map(({ value, label }) => (
                      <Checkbox
                        key={`${value}-channels`}
                        name="channels"
                        label={label}
                        value={value}
                        className="mb-5"
                      />
                    ))}
                    <TextInput
                      type="text"
                      Icon={EditIcon}
                      label="Notes"
                      placeholder="Enter Notes"
                      name="notes"
                      className="mb-5"
                    />
                    <Card title="Attachment" className="mt-5">
                      <div className="flex flex-wrap gap-4">
                        {!!socialMedia.attachments ? (
                          socialMedia.attachments.map(
                            ({ socialMediaAttachmentId, url, thumbnailUrl }) => {
                              const toggleFile = () =>
                                toggleShowPhotoVideoFileModal(url, 'image/jpeg', 'socialMediaFile')

                              return (
                                <>
                                  <PhotographyVideographyFileButton
                                    key={`socialMediaFile-${socialMediaAttachmentId}`}
                                    className="h-35 w-35"
                                    url={url}
                                    fileType="image/jpeg"
                                    name={`socialMediaFile-${socialMediaAttachmentId}`}
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
                    <FileDropZone
                      label="Update Attachment"
                      name="attachments"
                      maxSize={250}
                      mimeType="image/gif"
                      accept={['.gif', '.jpeg', '.png', '.jpg']}
                      multiple
                      className="mb-8"
                    />
                    <div className="flex space-x-5">
                      <Link href="/social-media">
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
              </Form>
            )}
          </Formik>
        </div>
      )}
      <FileDisplayModal />
      <FileDisplayModal />
    </>
  )
}

SocialMediaPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default SocialMediaPage
