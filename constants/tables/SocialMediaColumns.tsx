import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material'
import { DesktopDateTimePicker } from '@mui/x-date-pickers'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useId, useRef, useState } from 'react'
import { useQueryClient } from 'react-query'
import { MultiValue, SingleValue } from 'react-select'
import { Column } from 'react-table'
import { Card } from '../../components/Card'
import { BoostIcon } from '../../components/icons/BoostIcon'
import { BoostOffIcon } from '../../components/icons/BoostOffIcon'
import { DollarIcon } from '../../components/icons/DollarIcon'
import { EditIcon } from '../../components/icons/EditIcon'
import { FileIcon } from '../../components/icons/FileIcon'
import { PlusIcon } from '../../components/icons/PlusIcon'
import { TrashIcon } from '../../components/icons/TrashIcon'
import {
  DeleteSocialMediaModal,
  useDeleteSocialMediaModalStore,
} from '../../components/modals/DeleteSocialMediaModal'
import {
  EditSocialMediaBoostModal,
  useEditSocialMediaBoostModal,
} from '../../components/modals/EditSocialMediaBoostModal'
import { useEditSocialMediaModal } from '../../components/modals/EditSocialMediaModal'
import { FileUploadModal, useFileUploadModal } from '../../components/modals/FileUploadModal'
import {
  SocialMediaFileModal,
  useSocialMediaFileModalStore,
} from '../../components/modals/SocialMediaFileModal'
import { SocialMediaChannelSelect } from '../../components/SocialMediaChannelSelect'
import { SocialMediaStatusSelect } from '../../components/SocialMediaStatusSelect'
import { useToastStore } from '../../store/ToastStore'
import { SelectOption } from '../../types/SelectOption.type'
import { SocialMedia } from '../../types/SocialMedia.type'
import { SocialMediaChannel } from '../../types/SocialMediaChannel.type'
import { SocialMediaStatus } from '../../types/SocialMediaStatus.type'
import { SocialMediaChannelOptions } from '../options/SocialMediaChannelOptions'
import { SocialMediaStatusOptions } from '../options/SocialMediaStatusOptions'
const updateSocialMedia = async (socialMedia: SocialMedia) => {
  try {
    const { status } = await axios.put(`/v1/social-media/${socialMedia.id}`, {
      ...socialMedia,
      copy: socialMedia.copy ?? '',
      notes: socialMedia.notes ?? '',
    })

    return status === 200
  } catch (e) {
    return false
  }
}

export const SocialMediaColumns: Array<Column<SocialMedia>> = [
  {
    Header: 'ID',
    accessor: 'id',
    id: 'id',
    Cell: ({ value, row: { original: socialMedia } }) => {
      const toggleEditSocialMediaModal = useEditSocialMediaModal(
        (state) => state.toggleEditSocialMediaModal
      )

      return (
        <div className="text-sm font-medium text-bright-navy-blue">
          <Tooltip title="Edit Social Media" placement="right-start">
            <button
              onClick={() => {
                toggleEditSocialMediaModal(socialMedia)
              }}
            >
              {value}
            </button>
          </Tooltip>
        </div>
      )
    },
  },
  {
    Header: 'Post Topic',
    accessor: 'post',
    Cell: ({ value, row: { original: socialMedia } }) => {
      const [post, setPost] = useState(value)
      const inputRef = useRef<HTMLInputElement>(null)
      const showToast = useToastStore((state) => state.showToast)
      const queryClient = useQueryClient()

      const updatePost = async () => {
        if (await updateSocialMedia({ ...socialMedia, post })) {
          showToast({
            type: 'success',
            message: `Social Media ${socialMedia.id} updated!`,
          })
          queryClient.invalidateQueries(['socialMedias'])
        } else
          showToast({
            type: 'error',
            message: 'Something went wrong! 😵',
          })
      }

      useEffect(() => {
        setPost(value)
      }, [value])

      return (
        <input
          ref={inputRef}
          type="text"
          value={post}
          onChange={({ currentTarget: { value } }) => setPost(value)}
          className="ml-px text-ellipsis rounded-md bg-transparent px-2 text-sm font-medium text-onyx focus:bg-white focus:ring-2 focus:ring-halloween-orange"
          onBlur={() => {
            if (post !== socialMedia.post) updatePost()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              inputRef.current?.blur()
            }
          }}
        />
      )
    },
  },
  {
    Header: 'Date & Time',
    accessor: 'postDate',
    Cell: ({ value, row: { original: socialMedia } }) => {
      const [postDate, setPostDate] = useState(value)
      const [pickerVisible, setPickerVisible] = useState(false)
      const showToast = useToastStore((state) => state.showToast)
      const queryClient = useQueryClient()

      const updatePostDate = async () => {
        if (await updateSocialMedia({ ...socialMedia, postDate })) {
          showToast({
            type: 'success',
            message: `Social Media ${socialMedia.id} updated!`,
          })
          queryClient.invalidateQueries(['socialMedias'])
        } else
          showToast({
            type: 'error',
            message: 'Something went wrong! 😵',
          })
      }

      useEffect(() => {
        setPostDate(value)
      }, [value])

      return (
        <DesktopDateTimePicker
          disableMaskedInput
          inputFormat="MM/dd/yyyy h:mmaaa"
          value={postDate}
          onChange={setPostDate}
          onClose={() => {
            setPickerVisible(false)
            if (postDate?.toDateString() !== socialMedia.postDate?.toDateString()) updatePostDate()
          }}
          open={pickerVisible}
          renderInput={({ inputRef, inputProps }) => (
            <input
              {...inputProps}
              ref={inputRef}
              placeholder=""
              onClick={() => setPickerVisible(true)}
              readOnly
              className={`ml-px text-ellipsis rounded-md bg-transparent px-2 text-sm font-medium text-onyx focus:bg-white${
                pickerVisible ? ' ring-2 ring-halloween-orange' : ' '
              }`}
            />
          )}
        />
      )
    },
  },
  {
    Header: 'Attachments',
    accessor: 'attachments',
    Cell: ({ value, row: { original: socialMedia } }) => {
      const attachmentId = useId()

      const { setVisible } = useFileUploadModal()

      const toggleUploadFile = () => setVisible(true, socialMedia)

      const { toggleShowSocialMediaFileModal } = useSocialMediaFileModalStore()

      return (
        <>
          <div className="mr-5 w-40">
            <div className="grid grid-cols-4 gap-2">
              {value &&
                value.map(({ url, fileType, thumbnailUrl, name, socialMediaAttachmentId }) => {
                  const toggleFile = () =>
                    toggleShowSocialMediaFileModal(
                      url,
                      fileType,
                      name,
                      socialMediaAttachmentId,
                      socialMedia.id
                    )

                  return (
                    <Tooltip key={`${attachmentId}-${socialMediaAttachmentId}`} title={name}>
                      <button
                        type="button"
                        className="relative h-9 w-full min-w-[2.25rem] hover:rounded hover:border-2 hover:border-halloween-orange"
                        onClick={toggleFile}
                      >
                        {thumbnailUrl ? (
                          <Image
                            src={thumbnailUrl}
                            alt={name}
                            layout="fill"
                            objectFit="contain"
                            objectPosition="left"
                            className="rounded-sm"
                          />
                        ) : (
                          <div className="h-9 min-w-[2.25rem]">
                            <FileIcon className="h-8 min-w-[2rem]" />
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 font-varela-round text-tiny uppercase text-white">
                              {name.split(/\./).pop()}
                            </div>
                          </div>
                        )}
                      </button>
                    </Tooltip>
                  )
                })}
              <Tooltip title="Add Attachment(s)" placement="top">
                <button onClick={toggleUploadFile} className="flex py-2" type="button">
                  <PlusIcon className="stroke-halloween-orange" />
                </button>
              </Tooltip>
            </div>
          </div>
          <FileUploadModal />
          <SocialMediaFileModal />
        </>
      )
    },
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value, row: { original: socialMedia } }) => {
      const [status, setStatus] = useState<SingleValue<SelectOption<SocialMediaStatus>>>({
        label: value,
        value,
      })
      const showToast = useToastStore((state) => state.showToast)
      const queryClient = useQueryClient()

      const updateStatus = async (status: SocialMediaStatus) => {
        if (await updateSocialMedia({ ...socialMedia, status })) {
          showToast({
            type: 'success',
            message: `Social Media ${socialMedia.id} updated!`,
          })
          queryClient.invalidateQueries(['socialMedias'])
        } else
          showToast({
            type: 'error',
            message: 'Something went wrong! 😵',
          })
      }

      useEffect(() => {
        setStatus({
          label: value,
          value,
        })
      }, [value])

      return (
        <div className="w-35">
          <SocialMediaStatusSelect
            value={status}
            onChange={(status) => {
              setStatus(status)
              updateStatus(status!.value)
            }}
            options={SocialMediaStatusOptions}
            placeholder=""
            menuPlacement="auto"
            menuPortalTarget={document.body}
          />
          {/* Nice logo test test */}
        </div>
      )
    },
  },
  {
    Header: 'Copy',
    accessor: 'copy',
    Cell: ({ value, row: { original: socialMedia } }) => {
      const [copy, setCopy] = useState(value)
      const inputRef = useRef<HTMLInputElement>(null)
      const showToast = useToastStore((state) => state.showToast)
      const queryClient = useQueryClient()

      const updateCopy = async () => {
        if (await updateSocialMedia({ ...socialMedia, copy })) {
          showToast({
            type: 'success',
            message: `Social Media ${socialMedia.id} updated!`,
          })
          queryClient.invalidateQueries(['socialMedias'])
        } else
          showToast({
            type: 'error',
            message: 'Something went wrong! 😵',
          })
      }

      useEffect(() => {
        setCopy(value)
      }, [value])

      return (
        <input
          ref={inputRef}
          type="text"
          value={copy ?? ''}
          onChange={({ currentTarget: { value } }) => setCopy(value)}
          className="ml-px text-ellipsis rounded-md bg-transparent px-2 text-sm font-medium text-onyx focus:bg-white focus:ring-2 focus:ring-halloween-orange"
          onBlur={() => {
            if (copy !== socialMedia.copy) updateCopy()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              inputRef.current?.blur()
            }
          }}
        />
      )
    },
  },
  {
    Header: 'Channels',
    accessor: 'channels',
    Cell: ({ value, row: { original: socialMedia } }) => {
      const [channels, setChannels] = useState<MultiValue<SelectOption<SocialMediaChannel>>>(
        value
          ?.filter((channel) => (channel as string) !== '')
          .map((channel) => ({ label: channel, value: channel })) ?? []
      )
      const showToast = useToastStore((state) => state.showToast)
      const queryClient = useQueryClient()

      const updateChannels = async (channels: Array<SocialMediaChannel>) => {
        if (await updateSocialMedia({ ...socialMedia, channels })) {
          showToast({
            type: 'success',
            message: `Social Media ${socialMedia.id} updated!`,
          })
          queryClient.invalidateQueries(['socialMedias'])
        } else
          showToast({
            type: 'error',
            message: 'Something went wrong! 😵',
          })
      }

      useEffect(() => {
        setChannels(
          value
            ?.filter((channel) => (channel as string) !== '')
            .map((channel) => ({ label: channel, value: channel })) ?? []
        )
      }, [value])

      return (
        <div className="w-75">
          <SocialMediaChannelSelect
            value={channels}
            onChange={(channels) => {
              setChannels(channels)
              updateChannels(channels.map(({ value }) => value))
            }}
            options={SocialMediaChannelOptions}
            placeholder=""
            isMulti
            menuPlacement="auto"
            menuPortalTarget={document.body}
          />
        </div>
      )
    },
  },
  {
    Header: 'Booster',
    accessor: 'boostedChannels',
    Cell: ({ row: { original: socialMedia } }) => {
      const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip
          {...props}
          classes={{ popper: className }}
          placement="top-end"
          className="ml-auto"
        />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          maxWidth: 260,
          backgroundColor: 'white',
          fontSize: theme.typography.pxToRem(11),
        },
      }))

      const toggleEditSocialMediaBoostModal = useEditSocialMediaBoostModal(
        (state) => state.toggleEditSocialMediaBoostModal
      )

      return (
        <div className="flex items-center">
          {socialMedia.boostedChannels && (
            <HtmlTooltip
              className=""
              title={
                <React.Fragment>
                  <Card className="">
                    <ul className="list-square">
                      <p className=" mb-2 text-lg font-bold text-halloween-orange">
                        Boosted Channels
                      </p>
                      {socialMedia.boostedChannels?.map((boostedChannel) => (
                        <li key={boostedChannel.name} className="mb-3 text-halloween-orange">
                          {boostedChannel.name}
                          <div className="mt-2 flex space-x-5">
                            <DollarIcon className="-mr-2 -mt-1 stroke-jungle-green transition-colors hover:stroke-halloween-orange"></DollarIcon>

                            <p className="-ml-9 text-xs text-jungle-green">
                              {Number(boostedChannel.quantity).toLocaleString('en')}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </React.Fragment>
              }
            >
              <button
                onClick={() => {
                  toggleEditSocialMediaBoostModal(socialMedia)
                }}
              >
                <BoostIcon className="mr-5 h-10 stroke-jungle-green transition-colors hover:stroke-halloween-orange" />
              </button>
            </HtmlTooltip>
          )}
          {!socialMedia.boostedChannels && (
            <Tooltip title="Add booster" placement="top" className="ml-2 h-10">
              <button>
                <BoostOffIcon className=" stroke-gray-600 transition-colors hover:stroke-halloween-orange" />
              </button>
            </Tooltip>
          )}
          <EditSocialMediaBoostModal />
        </div>
      )
    },
  },
  {
    Header: 'Notes',
    accessor: 'notes',
    Cell: ({ value, row: { original: socialMedia } }) => {
      const [notes, setNotes] = useState(value)
      const inputRef = useRef<HTMLInputElement>(null)
      const showToast = useToastStore((state) => state.showToast)
      const queryClient = useQueryClient()

      const updateNotes = async () => {
        if (await updateSocialMedia({ ...socialMedia, notes })) {
          showToast({
            type: 'success',
            message: `Social Media ${socialMedia.id} updated!`,
          })
          queryClient.invalidateQueries(['socialMedias'])
        } else
          showToast({
            type: 'error',
            message: 'Something went wrong! 😵',
          })
      }

      useEffect(() => {
        setNotes(value)
      }, [value])

      return (
        <input
          ref={inputRef}
          type="text"
          value={notes ?? ''}
          onChange={({ currentTarget: { value } }) => setNotes(value)}
          className="ml-px text-ellipsis rounded-md bg-transparent px-2 text-sm font-medium text-onyx focus:bg-white focus:ring-2 focus:ring-halloween-orange"
          onBlur={() => {
            if (notes !== socialMedia.notes) updateNotes()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              inputRef.current?.blur()
            }
          }}
        />
      )
    },
  },
  {
    Header: 'Action',
    accessor: 'id',
    id: 'action',
    disableSortBy: true,
    Cell: ({ value, row: { original: socialMedia } }) => {
      const toggleEditSocialMediaModal = useEditSocialMediaModal(
        (state) => state.toggleEditSocialMediaModal
      )

      const { toggleModal: toggleDeleteModal } = useDeleteSocialMediaModalStore()
      return (
        <div className="mr-5 flex space-x-4">
          <Tooltip title="Edit Social Media" placement="top" className="ml-auto">
            <button
              onClick={() => {
                toggleEditSocialMediaModal(socialMedia)
              }}
            >
              <EditIcon className="stroke-waterloo hover:stroke-halloween-orange" />
            </button>
          </Tooltip>
          <Tooltip title="Edit Social Media" placement="top" className="ml-auto">
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleDeleteModal(value)
              }}
            >
              <TrashIcon className="stroke-waterloo hover:stroke-halloween-orange" />
            </button>
          </Tooltip>
          <DeleteSocialMediaModal />
        </div>
      )
    },
  },
]
