import { Tooltip } from '@mui/material'
import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SetStateAction, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { MultiValue, SingleValue } from 'react-select'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { SocialMediaCampaignTypeOptions } from '../../constants/options/SocialMediaCampaignTypeOptions'
import { SocialMediaChannelOptions } from '../../constants/options/SocialMediaChannelOptions'
import { SocialMediaStatusOptions } from '../../constants/options/SocialMediaStatusOptions'
import { CreateSocialMediaFormSchema } from '../../schemas/CreateSocialMediaFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { EditSocialMediaForm } from '../../types/forms/EditSocialMediaForm.type'
import { Page } from '../../types/Page.type'
import { SelectOption } from '../../types/SelectOption.type'
import { SocialMedia } from '../../types/SocialMedia.type'
import { SocialMediaCampaignType } from '../../types/SocialMediaCampaignType'
import { User } from '../../types/User.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
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
import { TrashIcon } from '../icons/TrashIcon'
import { MentionInput } from '../MentionInput'
import { Modal } from '../Modal'
import { PhotographyVideographyFileButton } from '../PhotographyVideographyFileButton'
import { Select } from '../Select'
import { SocialMediaActivityCard } from '../SocialMediaActivityCard'
import { SocialMediaCommentCard } from '../SocialMediaCommentCard'
import { TextInput } from '../TextInput'
import { TimeInput } from '../TimeInput'
import { DeleteSocialMediaCommentModal } from './DeleteSocialMediaCommentModal'
import { DeleteSocialMediaModal, useDeleteSocialMediaModalStore } from './DeleteSocialMediaModal'
import { EditSocialMediaCommentModal } from './EditSocialMediaCommentModal'
import { FileUploadModal, useFileUploadModal } from './FileUploadModal'
import { SocialMediaFileModal, useSocialMediaFileModalStore } from './SocialMediaFileModal'

export const useEditSocialMediaModal = createStore(
  combine(
    {
      socialMedia: undefined as SocialMedia | undefined,
    },
    (set) => ({
      toggleEditSocialMediaModal: (socialMedia?: SocialMedia) => set(() => ({ socialMedia })),
    })
  )
)

export const EditSocialMediaModal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [taggedUsers, setTaggedUsers] = useState({})
  const { replace } = useRouter()

  const socialMedia = useEditSocialMediaModal((state) => state.socialMedia)
  const toggleEditSocialMediaModal = useEditSocialMediaModal(
    (state) => state.toggleEditSocialMediaModal
  )

  const { data: users } = useQuery(
    'departments',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<User>
        page: Page
      }>(`/v1/clients/${socialMedia?.clientId}/social-media-users`)

      return data
    },
    {
      enabled: !!socialMedia?.clientId && socialMedia?.clientId !== -1,
    }
  )

  const userOptions =
    (users &&
      users?.map((user) => ({
        id: user.id.toString(),
        display: user.firstName,
      }))) ??
    []

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
      if (!socialMedia) {
        return
      }

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
        message: get422And400ResponseError(e),
      })
    }
  }

  const commentTagedUsers = (event: { target: { value: SetStateAction<string> } }) => {
    const comment = event.target.value
    const regex = /@\[.+?\]\(.+?\)/gm
    const idRegex = /\(.+?\)/g
    const matches = comment.toString().match(regex)
    const mentionUsers: {}[] = []
    matches &&
      matches.forEach((m) => {
        // @ts-ignore: Object is possibly 'null'.
        const id = m.match(idRegex)[0].replace('(', '').replace(')', '')
        mentionUsers.push(id)
      })
    const mentionUsersInt = mentionUsers.map((id) => {
      return Number(id)
    })
    setTaggedUsers(mentionUsersInt)
  }

  const submitCommentForm = async () => {
    if (!socialMedia) {
      return
    }

    const { status } = await axios.post(`/v1/social-media/${socialMedia.id}/comments`, {
      comment: comment,
      usersTagged: taggedUsers,
    })

    if (status === 200) {
      queryClient.invalidateQueries(['socialMedia', socialMedia.id])
      queryClient.invalidateQueries(['socialMedias'])
      setComment('')
      showToast({
        type: 'success',
        message: `Comment successfully added!`,
      })
    }
  }

  const { toggleShowSocialMediaFileModal } = useSocialMediaFileModalStore()

  const { setVisible } = useFileUploadModal()

  const toggleUploadFile = () => setVisible(true, socialMedia)

  const { toggleModal: toggleDeleteModal } = useDeleteSocialMediaModalStore()

  const closeModal = () => {
    if (!!session && session.isClient) {
      replace('/social-media')
    } else {
      replace('/dashboard')
    }

    toggleEditSocialMediaModal()
  }

  if (!socialMedia) return null

  return (
    <>
      {socialMedia && (
        <Modal
          title="Edit Social Media"
          bgColor="bg-cultured"
          className="w-320"
          onClose={toggleEditSocialMediaModal}
        >
          <div className="flex w-full">
            <Formik
              initialValues={{
                post: socialMedia?.post,
                attachments: socialMedia?.attachments,
                copy: socialMedia?.copy,
                status: socialMedia?.status,
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
                <Form className="mr-8 max-h-130 overflow-y-auto">
                  <div className="flex w-full flex-col">
                    <Card className="mb-5 h-fit w-full">
                      <div className="absolute top-6 right-6 space-x-2">
                        <Tooltip title="Delete Record" placement="top">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleDeleteModal(socialMedia.id)
                            }}
                            className="group"
                          >
                            <TrashIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
                          </button>
                        </Tooltip>
                      </div>
                      <TextInput
                        type="text"
                        Icon={EditIcon}
                        placeholder="Enter Post Topic"
                        label="Post Topic"
                        name="post"
                        className="mb-5 mt-8"
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
                          ({ value }) => value === socialMedia.status
                        )}
                        className="mb-5"
                      />
                      <label className="mb-2 inline-block text-xs font-medium text-metallic-silver">
                        Campaign Type
                      </label>
                      <CreateSelectNoFormik
                        options={SocialMediaCampaignTypeOptions}
                        className="mb-5"
                        placeholder="Select Campaign Type"
                        name="campaignType"
                        defaultValue={SocialMediaCampaignTypeOptions.find(
                          ({ value }) => value === socialMedia.campaignType
                        )}
                        onChange={(
                          campaignType: SingleValue<SelectOption<SocialMediaCampaignType>>
                        ) => {
                          setFieldValue('campaignType', campaignType?.value)
                        }}
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
                        {!!socialMedia.attachments && socialMedia.attachments.length > 0 ? (
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
                          <div className="m-auto text-sm text-metallic-silver">No files found.</div>
                        )}
                      </div>
                    </Card>
                    <Card className="h-fit w-full">
                      <div className="flex space-x-5">
                        <Button ariaLabel="Cancel" onClick={closeModal} type="button" light>
                          Cancel
                        </Button>
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
                {!!socialMedia.activities && socialMedia!.activities?.length > 0 ? (
                  <div className="flex flex-col">
                    {socialMedia.activities?.map(({ action, user, fields, createdAt }) => (
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
                    {!!socialMedia.comments && socialMedia!.comments?.length > 0 ? (
                      <div className="flex flex-col">
                        {socialMedia.comments?.map(
                          ({ id, comment, createdBy, createdAt, createdById }) => (
                            <SocialMediaCommentCard
                              key={`comment-${id}`}
                              socialMediaId={socialMedia.id}
                              clientId={socialMedia.clientId}
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
                      <div className="text-sm text-metallic-silver">No Comment found.</div>
                    )}
                    <MentionInput
                      className="mt-5"
                      value={comment}
                      data={userOptions}
                      onChange={(event: { target: { value: SetStateAction<string> } }) => {
                        setComment(event.target.value)
                        commentTagedUsers(event)
                      }}
                      placeholder="Enter Comment, use the @ symbol to tag other users."
                    />
                    <Button
                      className="mt-5"
                      ariaLabel="Submit Comment"
                      type="button"
                      onClick={submitCommentForm}
                    >
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
      <DeleteSocialMediaModal />
    </>
  )
}
