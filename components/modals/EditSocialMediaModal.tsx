import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQuery, useQueryClient } from 'react-query'
import { MultiValue } from 'react-select'
import { SocialMediaChannelOptions } from '../../constants/options/SocialMediaChannelOptions'
import { SocialMediaStatusOptions } from '../../constants/options/SocialMediaStatusOptions'
import { CreateSocialMediaCommentFormSchema } from '../../schemas/CreateSocialMediaCommentFormSchema'
import { CreateSocialMediaFormSchema } from '../../schemas/CreateSocialMediaFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { CreateSocialMediaCommentForm } from '../../types/forms/CreateSocialMediaCommentForm.type'
import { EditSocialMediaForm } from '../../types/forms/EditSocialMediaForm.type'
import { SelectOption } from '../../types/SelectOption.type'
import { SocialMedia } from '../../types/SocialMedia.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { Card } from '../Card'
import { CreateSelectNoFormik } from '../CreateSelectNoFormik'
import { DateInput } from '../DateInput'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { EditIcon } from '../icons/EditIcon'
import { FloppyDiskIcon } from '../icons/FloppyDiskIcon'
import { PaperPlaneIcon } from '../icons/PaperPlaneIcon'
import { PlusIcon } from '../icons/PlusIcon'
import { LinkButton } from '../LinkButton'
import { Modal } from '../Modal'
import { PhotographyVideographyFileButton } from '../PhotographyVideographyFileButton'
import { Select } from '../Select'
import { SocialMediaActivityCard } from '../SocialMediaActivityCard'
import { SocialMediaCommentCard } from '../SocialMediaCommentCard'
import { TextInput } from '../TextInput'
import { TimeInput } from '../TimeInput'
import { DeleteSocialMediaCommentModal } from './DeleteSocialMediaCommentModal'
import { EditSocialMediaCommentModal } from './EditSocialMediaCommentModal'
import { SocialMediaFileModal, useSocialMediaFileModalStore } from './SocialMediaFileModal'
import {
  UploadSocialMediaFileModal,
  useUploadSocialMediaFileModalStore,
} from './UploadSocialMediaFileModal'

export const EditSocialMediaModal = ({
  isVisible,
  onClose,
  socialMedia,
}: {
  isVisible: boolean
  onClose: () => void
  socialMedia: SocialMedia
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { data: session } = useSession()

  const { data: socialMediaDetails } = useQuery(
    ['socialMedia', socialMedia.id],
    async () => {
      const { data } = await axios.get<SocialMedia>(`/v1/social-media/${socialMedia.id}`)

      return data
    },
    {
      enabled: !!socialMedia.id,
    }
  )

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
        `/v1/social-media/${socialMedia.id}`,
        objectWithFileToFormData(values)
      )
      if (status === 200) {
        queryClient.invalidateQueries(['socialMedia', socialMedia.id])
        queryClient.invalidateQueries(['socialMedias'])
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

  const submitCommentForm = async (
    values: CreateSocialMediaCommentForm,
    {
      resetForm,
    }: {
      resetForm: () => void
    }
  ) => {
    const { status } = await axios.post(`/v1/social-media/${socialMedia.id}/comments`, values)
    if (status === 200) {
      queryClient.invalidateQueries(['socialMedia', socialMedia.id])
      queryClient.invalidateQueries(['socialMedias'])
      resetForm()
    }
  }

  const { toggleShowSocialMediaFileModal } = useSocialMediaFileModalStore()

  const { toggleUploadSocialMediaFileModal } = useUploadSocialMediaFileModalStore()

  const toggleUploadFile = () => toggleUploadSocialMediaFileModal(socialMediaDetails)

  if (!socialMediaDetails) return null

  return (
    <>
      {isVisible && (
        <Modal title="Edit Social Media" bgColor="bg-cultured" className="w-270" onClose={onClose}>
          <div className="flex w-full">
            <Formik
              initialValues={{
                post: socialMediaDetails?.post,
                attachments: socialMediaDetails?.attachments,
                copy: socialMediaDetails?.copy,
                status: socialMediaDetails?.status,
                channels: socialMediaDetails?.channels,
                notes: socialMediaDetails?.notes,
                postDate: socialMediaDetails?.postDate && new Date(socialMediaDetails?.postDate),
                postTime: socialMediaDetails?.postDate && new Date(socialMediaDetails?.postDate),
                _method: 'PUT',
              }}
              validationSchema={CreateSocialMediaFormSchema}
              onSubmit={submitForm}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className="mr-8 max-h-130 overflow-y-auto">
                  <div className="flex w-full flex-col">
                    <Card className="mb-5 h-fit w-full">
                      <TextInput
                        type="text"
                        Icon={EditIcon}
                        placeholder="Enter Post Topic"
                        label="Post Topic"
                        name="post"
                        className="mb-5"
                      />
                      <div className="mb-5 flex space-x-5">
                        <DateInput
                          name="postDate"
                          placeholder="Select Post Date"
                          label="Post Date"
                        />
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
                          ({ value }) => value === socialMediaDetails.status
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
                          if (socialMediaDetails.channels) {
                            const seletedChannel = socialMediaDetails.channels?.map((channel) => ({
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
                    </Card>
                    <Card title="Attachment" className="mb-5 h-fit w-full">
                      <button
                        onClick={toggleUploadFile}
                        className="absolute top-6 right-6 flex space-x-2"
                        type="button"
                      >
                        <PlusIcon className="stroke-halloween-orange" />
                        <div className=" text-sm font-semibold text-halloween-orange">
                          Upload File
                        </div>
                      </button>
                      <div className="flex flex-wrap gap-4">
                        {!!socialMediaDetails.attachments &&
                        socialMediaDetails.attachments.length > 0 ? (
                          socialMediaDetails.attachments.map(
                            ({ socialMediaAttachmentId, url, thumbnailUrl, name, fileType }) => {
                              const toggleFile = () =>
                                toggleShowSocialMediaFileModal(
                                  url,
                                  fileType,
                                  name,
                                  socialMediaAttachmentId,
                                  socialMediaDetails.id
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
                          <div className="m-auto text-sm text-metallic-silver">No files found.</div>
                        )}
                      </div>
                    </Card>
                    <Card className="h-fit w-full">
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
            <div className="h-fit max-h-130 w-2/4 overflow-y-auto">
              <Card
                className="!bg-cultured"
                title="Activity"
                titlePosition="center"
                titleClassName="text-halloween-orange"
              >
                {!!socialMediaDetails.activities && socialMediaDetails!.activities?.length > 0 ? (
                  <div className="flex flex-col">
                    {socialMediaDetails.activities?.map(({ action, user, fields, createdAt }) => (
                      <SocialMediaActivityCard
                        key={`activity-${action}`}
                        action={action}
                        createdBy={user}
                        fields={fields}
                        createdAt={createdAt}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="m-auto text-sm text-metallic-silver">No Activity found.</div>
                )}
              </Card>
              <Card
                className="!bg-cultured"
                title="Comment"
                titlePosition="center"
                titleClassName="text-halloween-orange"
              >
                <div className="flex flex-col">
                  <>
                    {!!socialMediaDetails.comments && socialMediaDetails!.comments?.length > 0 ? (
                      <div className="flex flex-col">
                        {socialMediaDetails.comments?.map(
                          ({ id, comment, createdBy, createdAt, createdById }) => (
                            <SocialMediaCommentCard
                              key={`comment-${id}`}
                              socialMediaId={socialMediaDetails.id}
                              id={id}
                              comment={comment}
                              createdBy={createdBy}
                              createdAt={createdAt}
                              isEditDelete={createdById === session?.user.id ? true : false}
                            />
                          )
                        )}
                      </div>
                    ) : (
                      <div className="m-auto text-sm text-metallic-silver">No Comment found.</div>
                    )}
                    <Formik
                      validationSchema={CreateSocialMediaCommentFormSchema}
                      initialValues={{ comment: '' }}
                      onSubmit={submitCommentForm}
                    >
                      {({ isSubmitting }) => (
                        <Form className="mt-5">
                          <TextInput
                            type="text"
                            Icon={EditIcon}
                            placeholder="Enter Comment"
                            name="comment"
                            className="mb-5"
                          />
                          <Button ariaLabel="Submit Comment" type="submit" disabled={isSubmitting}>
                            <PaperPlaneIcon className="stroke-white" />
                            <div>Send</div>
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </>
                </div>
              </Card>
            </div>
          </div>
        </Modal>
      )}
      <SocialMediaFileModal />
      <UploadSocialMediaFileModal />
      <EditSocialMediaCommentModal />
      <DeleteSocialMediaCommentModal />
    </>
  )
}