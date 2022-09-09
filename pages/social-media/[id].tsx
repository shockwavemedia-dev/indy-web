import axios from 'axios'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { MultiValue } from 'react-select'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { CreateSelectNoFormik } from '../../components/CreateSelectNoFormik'
import { DateInput } from '../../components/DateInput'
import { FileDropZone } from '../../components/FileDropZone'
import { ClipboardIcon } from '../../components/icons/ClipboardIcon'
import { EditIcon } from '../../components/icons/EditIcon'
import { FloppyDiskIcon } from '../../components/icons/FloppyDiskIcon'
import { LinkButton } from '../../components/LinkButton'
import {
  SocialMediaFileModal,
  useSocialMediaFileModalStore,
} from '../../components/modals/SocialMediaFileModal'
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
import { SelectOption } from '../../types/SelectOption.type'
import { SocialMedia } from '../../types/SocialMedia.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'

const SocialMediaPage: NextPageWithLayout = () => {
  const {
    query: { id },
  } = useRouter()
  const { setHeader } = usePanelLayoutStore()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { toggleShowSocialMediaFileModal } = useSocialMediaFileModalStore()

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

      values.postDate = new Date(postDateTime)
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
              postDate: socialMedia?.postDate && new Date(socialMedia?.postDate),
              postTime: socialMedia?.postDate && new Date(socialMedia?.postDate),
              _method: 'PUT',
            }}
            validationSchema={CreateSocialMediaFormSchema}
            onSubmit={submitForm}
          >
            {({ isSubmitting, setFieldValue }) => (
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
                      <DateInput name="postDate" placeholder="Select Post Date" label="Post Date" />
                      <TimeInput name="postTime" placeholder="Select Time" label="Post Time" />
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
                      Channels
                    </label>
                    <CreateSelectNoFormik
                      options={SocialMediaChannelOptions}
                      className="mb-5"
                      placeholder="Select Channel"
                      name="channels"
                      defaultValue={(() => {
                        if (socialMedia.channels) {
                          const seletedChannel = socialMedia.channels?.map((channel) => ({
                            value: channel,
                            label: channel,
                          }))

                          return seletedChannel
                        }
                      })()}
                      isMulti
                      onChange={(channel: MultiValue<SelectOption<string>>) => {
                        setFieldValue(
                          'channels',
                          channel.map((option) => option.value)
                        )
                      }}
                    />
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
                            ({ socialMediaAttachmentId, url, thumbnailUrl, name, fileType }) => {
                              const toggleFile = () =>
                                toggleShowSocialMediaFileModal(
                                  url,
                                  fileType,
                                  name,
                                  socialMediaAttachmentId,
                                  socialMedia.id
                                )

                              return (
                                <>
                                  <PhotographyVideographyFileButton
                                    key={`socialMediaFile-${socialMediaAttachmentId}`}
                                    className="h-35 w-35"
                                    url={url}
                                    fileType={fileType}
                                    name={name}
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
                      label="Add Attachment"
                      name="attachments"
                      maxSize={250}
                      mimeType="image/gif"
                      accept={['.gif', '.jpeg', '.png', '.jpg']}
                      multiple
                      className="mb-8"
                    />
                    <div className="flex space-x-5">
                      <LinkButton title="Cancel" href="/social-media" light />
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
      <SocialMediaFileModal />
    </>
  )
}

SocialMediaPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default SocialMediaPage
