import { Tooltip } from '@mui/material'
import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQuery, useQueryClient } from 'react-query'
import { MultiValue, SingleValue } from 'react-select'
import { SocialMediaCampaignTypeOptions } from '../../constants/options/SocialMediaCampaignTypeOptions'
import { SocialMediaChannelOptions } from '../../constants/options/SocialMediaChannelOptions'
import { SocialMediaStatusOptions } from '../../constants/options/SocialMediaStatusOptions'
import { CreateSocialMediaFormSchema } from '../../schemas/CreateSocialMediaFormSchema'
import { useSocialMediaStore } from '../../store/SocialMediaStore'
import { useToastStore } from '../../store/ToastStore'
import { EditSocialMediaForm } from '../../types/forms/EditSocialMediaForm.type'
import { SelectOption } from '../../types/SelectOption.type'
import { SocialMedia } from '../../types/SocialMedia.type'
import { SocialMediaCampaignType } from '../../types/SocialMediaCampaignType'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { Card } from '../Card'
import { CreateSelectNoFormik } from '../CreateSelectNoFormik'
import { DateInput } from '../DateInput'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { EditIcon } from '../icons/EditIcon'
import { ExpandIcon } from '../icons/ExpandIcon'
import { FloppyDiskIcon } from '../icons/FloppyDiskIcon'
import { PlusIcon } from '../icons/PlusIcon'
import { Modal } from '../Modal'
import { PhotographyVideographyFileButton } from '../PhotographyVideographyFileButton'
import { Select } from '../Select'
import { TextInput } from '../TextInput'
import { TimeInput } from '../TimeInput'
import { DeleteSocialMediaModal } from './DeleteSocialMediaModal'
import { EditSocialMediaModal } from './EditSocialMediaModal'
import { FileUploadModal, useFileUploadModal } from './FileUploadModal'
import { SocialMediaFileModal, useSocialMediaFileModalStore } from './SocialMediaFileModal'

export const EditSocialMediaCalendarModal = ({
  onClose,
  socialMedia,
}: {
  onClose: () => void
  socialMedia?: SocialMedia
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const { data: socialMediaDetails } = useQuery(
    ['socialMedia', socialMedia?.id],
    async () => {
      const { data } = await axios.get<SocialMedia>(`/v1/social-media/${socialMedia?.id}`)

      return data
    },
    {
      enabled: !!socialMedia,
    }
  )

  const { setActiveSocialMedia, isEditSocialMediaModalVisible, toggleEditSocialMediaModal } =
    useSocialMediaStore()

  const expandRecord = () => {
    onClose()
    setActiveSocialMedia(socialMedia!)
    toggleEditSocialMediaModal()
  }

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
        `/v1/social-media/${socialMedia?.id}`,
        objectWithFileToFormData(values)
      )
      if (status === 200) {
        queryClient.invalidateQueries(['socialMedia', socialMedia?.id])
        queryClient.invalidateQueries(['socialMedias'])
        queryClient.invalidateQueries(['social-media-calendar'])
        onClose()
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

  const { toggleShowSocialMediaFileModal } = useSocialMediaFileModalStore()

  const { setVisible } = useFileUploadModal()

  const toggleUploadFile = () => setVisible(true, socialMediaDetails)

  if (!socialMediaDetails) return null

  if (!socialMedia) return null

  return (
    <>
      {!!socialMedia && (
        <Modal
          title="Edit Social Media"
          bgColor="bg-cultured"
          className="max-h-175 overflow-y-auto"
          onClose={onClose}
        >
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
                <Form className="flex w-140 flex-col">
                  <Card className="mb-5 h-fit w-full">
                    <div className="absolute top-6 right-6 space-x-2">
                      <Tooltip title="Expand Record" placement="top">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            expandRecord()
                          }}
                          className="group"
                        >
                          <ExpandIcon className="stroke-bright-navy-blue group-hover:stroke-halloween-orange" />
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
                        ({ value }) => value === socialMediaDetails.status
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
                        ({ value }) => value === socialMediaDetails.campaignType
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
                      <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                        Cancel
                      </Button>
                      <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                        <FloppyDiskIcon className="stroke-white" />
                        <div>Save</div>
                      </Button>
                    </div>
                  </Card>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      )}
      <SocialMediaFileModal />
      <FileUploadModal />
      <DeleteSocialMediaModal />
      <EditSocialMediaModal
        isVisible={isEditSocialMediaModalVisible}
        onClose={toggleEditSocialMediaModal}
        socialMedia={socialMedia!}
      />
    </>
  )
}
