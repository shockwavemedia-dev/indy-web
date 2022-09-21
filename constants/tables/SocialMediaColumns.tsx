import { Tooltip } from '@mui/material'
import { DesktopDateTimePicker } from '@mui/x-date-pickers'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'
import { useQueryClient } from 'react-query'
import { MultiValue, SingleValue } from 'react-select'
import { Column } from 'react-table'
import { EditIcon } from '../../components/icons/EditIcon'
import { FileIcon } from '../../components/icons/FileIcon'
import { PlusIcon } from '../../components/icons/PlusIcon'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { FileUploadModal, useFileUploadModal } from '../../components/modals/FileUploadModal'
import { SocialMediaChannelSelect } from '../../components/SocialMediaChannelSelect'
import { SocialMediaStatusSelect } from '../../components/SocialMediaStatusSelect'
import { useSocialMediaStore } from '../../store/SocialMediaStore'
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
  // {
  //   Header: 'ID',
  //   accessor: 'id',
  //   id: 'id',
  //   Cell: ({ value }) => <div className="text-sm font-medium text-onyx">{value}</div>,
  // },
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

      return (
        <>
          <div className="mr-5 w-40">
            <div className="grid grid-cols-4 gap-2">
              {value &&
                value.map(({ thumbnailUrl, name, socialMediaAttachmentId }) => (
                  <Tooltip key={`${attachmentId}-${socialMediaAttachmentId}`} title={name}>
                    <button
                      type="button"
                      className="relative h-9 w-full min-w-[2.25rem] hover:rounded hover:border-2 hover:border-halloween-orange"
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
                        <FileIcon />
                      )}
                    </button>
                  </Tooltip>
                ))}
              <Tooltip title="Add Attachment(s)" placement="top">
                <button onClick={toggleUploadFile} className="flex py-2" type="button">
                  <PlusIcon className="stroke-halloween-orange" />
                </button>
              </Tooltip>
            </div>
          </div>
          <FileUploadModal />
        </>
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
          />
          {/* Nice logo test test */}
        </div>
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
          />
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
    Header: 'Actions',
    accessor: 'id',
    Cell: ({ row: { original: socialMedia } }) => {
      const { setActiveSocialMedia, toggleEditSocialMediaModal, toggleDeleteSocialMediaModal } =
        useSocialMediaStore()

      const editSocialMedia = () => {
        setActiveSocialMedia(socialMedia)
        toggleEditSocialMediaModal()
      }

      const deleteSocialMedia = () => {
        setActiveSocialMedia(socialMedia)
        toggleDeleteSocialMediaModal()
      }

      return (
        <div className="invisible flex space-x-2 group-hover:visible">
          <button onClick={editSocialMedia}>
            <EditIcon className="stroke-waterloo hover:stroke-halloween-orange" />
          </button>
          <button onClick={deleteSocialMedia}>
            <TrashIcon className="stroke-waterloo hover:stroke-halloween-orange" />
          </button>
        </div>
      )
    },
  },
]
