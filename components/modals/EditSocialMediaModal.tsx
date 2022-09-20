import { Icon } from '@mui/material'
import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Mention, MentionsInput, OnChangeHandlerFunc } from 'react-mentions'
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
import CommentParagraph from '../CommentParagraph'
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
import { FileUploadModal, useFileUploadModal } from './FileUploadModal'
import { SocialMediaFileModal, useSocialMediaFileModalStore } from './SocialMediaFileModal'

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

  const submitCommentForm = async () => {
    const { status } = await axios.post(`/v1/social-media/${socialMedia.id}/comments`, {
      comment: comment,
    })
    if (status === 200) {
      queryClient.invalidateQueries(['socialMedia', socialMedia.id])
      queryClient.invalidateQueries(['socialMedias'])
    }
  }

  const defaultStyle = {
    control: {
      color: '#32343D',
      font: '500 0.875rem/1.25rem Urbanist',
      margin: 0,
      padding: 0,
      minHeight: '3.125rem',
      boxShadow: '0 0 0 1px #E8E8EF',
      border: 'none',
      borderRadius: '.75rem',
      backgroundColor: '#ffffff',
      transition: 'none',

    },

    "&multiLine": {
      control: {
        font: '500 0.875rem/1.25rem Urbanist',
        minHeight: 63
      },
      highlighter: {
        padding: 9,
        border: 'none',
        borderRadius: '.75rem',
        "&focused": {
          backgroundColor: "0 0 0 2px #F25D23"
        }
      },
      input: {
        padding: 9,
        border: 'none',
        borderRadius: '.75rem',
      }
    },

    "&singleLine": {
      display: "inline-block",
      width: 180,

      highlighter: {
        padding: 1,
        border: "2px inset transparent"
      },
      input: {
        padding: 1,
        border: "2px inset"
      }
    },

    suggestions: {
      list: {
        backgroundColor: "white",
        border: "1px solid rgba(0,0,0,0.15)",
        font: '500 0.875rem/1.25rem Urbanist',
      },
      item: {
        padding: "5px 15px",
        borderBottom: "1px solid rgba(0,0,0,0.15)",
        "&focused": {
          backgroundColor: "#F25D2333"
        }
      }
    }
  };

  const [comment, setComment] = useState('')

  const users = [
    { id: '1', display: 'Daniel' },
    { id: '3', display: 'Ross' },
    { id: '2', display: 'Mark' },
    { id: '3', display: 'Kyle' },
    { id: '3', display: 'Arjean' },
  ]

  const { toggleShowSocialMediaFileModal } = useSocialMediaFileModalStore()

  const { setVisible } = useFileUploadModal()

  const toggleUploadFile = () => setVisible(true, socialMediaDetails)

  const handleChange: OnChangeHandlerFunc = (
    e: any,
    newValue: any,
    newPlainTextValue: any,
    mentions: any
  ) => {
    console.log('Input has changed', e, newValue, newPlainTextValue, mentions)
    setComment(e.target.value)
  }

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
                        key={`activity-${action}-${createdAt}`}
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
                      <MentionsInput
                      className="mt-5"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        style={defaultStyle}                        
                        placeholder="Enter Comment, use the @ symbol to tag other users."
                        allowSuggestionsAboveCursor={true}
                      >
                        <Mention
                          trigger="@"
                          data={users}
                          style={{
                          backgroundColor: '#ccccff',
                         }}
                        />
                      </MentionsInput>
                      <Button className="mt-5" ariaLabel="Submit Comment" type="button" onClick={submitCommentForm}>
                            <PaperPlaneIcon className="stroke-white" />
                            <div>Send</div>
                      </Button>
                  </>
                </div>
              </Card>
            </div>
          </div>
        </Modal>
      )}
      <SocialMediaFileModal />
      <EditSocialMediaCommentModal />
      <DeleteSocialMediaCommentModal />
      <FileUploadModal />
    </>
  )
}
