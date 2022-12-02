import { Tooltip } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { BadgeCheckIcon } from '../icons/BadgeCheckIcon'
import { EditIcon } from '../icons/EditIcon'
import { FileIcon } from '../icons/FileIcon'
import {
  TicketFileUploadRevisionModal,
  useTicketFileUploadRevisionModal,
} from './TicketFileUploadRevisionModal'

export const TicketFileButton = ({
  ticketFileId,
  isClient,
  isLatest,
  href,
  name,
  className,
  thumbnailUrl = null,
  fileStatus = '',
  disabled = false,
  version = null,
}: {
  isClient: boolean | null
  isLatest: boolean | null
  version: number | null
  ticketFileId: number
  href?: string
  name: string
  className?: string
  thumbnailUrl?: string | null
  fileStatus?: string
  Icon?: ReactNode
  disabled?: boolean
}) => {
  const { replace } = useRouter()

  const hrefRedirect = () => {
    if (href) {
      replace(href)
    }
  }

  const { toggleTicketFileUploadRevisionModal } = useTicketFileUploadRevisionModal()

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => {
          hrefRedirect()
        }}
        disabled={fileStatus === 'declined'}
        className={`peer relative flex w-35 flex-none flex-col items-center justify-center rounded-xl border-2 border-bright-gray p-3 hover:border-halloween-orange ${className} h-52`}
      >
        {fileStatus === 'approved' && (
          <Tooltip title="Approved" placement="top-end" className="ml-auto">
            <div>
              <BadgeCheckIcon className="absolute top-1 right-1 h-8 text-forest-green" />
            </div>
          </Tooltip>
        )}
        <div className={`relative mb-1 mt-4 ${thumbnailUrl ? 'h-16 w-16' : ''}`}>
          {thumbnailUrl ? (
            <Image src={thumbnailUrl} alt={name} height={64} width={64} className="rounded-md" />
          ) : (
            <FileIcon />
          )}
          {!thumbnailUrl && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 font-varela-round text-tiny uppercase text-white">
              {name?.split(/\./).pop()}
            </div>
          )}
        </div>
        <div className="mb-4 w-full break-words text-center text-xxs font-semibold text-onyx">
          {name}
        </div>
        <div className="-mt-3 mb-4 w-full break-words text-center text-sm font-semibold text-halloween-orange">
          {'ID #: ' + ticketFileId}
        </div>
        {fileStatus === 'declined' && (
          <Tooltip
            title="Declined and For Revisions"
            placement="top-end"
            className="ml-auto text-center "
          >
            <div className="w-full break-words text-center text-sm font-semibold text-red-crimson">
              {'Version ' + version}
            </div>
          </Tooltip>
        )}
        {isLatest && fileStatus === 'new' && (
          <Tooltip title="For Approval" placement="top-end" className="ml-auto text-center">
            <div className="w-full break-words text-center text-sm font-semibold text-bright-navy-blue">
              {'Latest Version ' + version}
            </div>
          </Tooltip>
        )}

        {isLatest && fileStatus === 'approved' && (
          <Tooltip title="Approved" placement="top-end" className="ml-auto text-center">
            <div className="w-full break-words text-center text-sm font-semibold text-forest-green">
              {'Latest Version ' + version}
            </div>
          </Tooltip>
        )}
      </button>
      {fileStatus === 'declined' && isLatest === true && isClient === false && (
        <>
          <button
            aria-label="Add new version"
            type="button"
            disabled={disabled}
            className="absolute top-3 right-3"
            onClick={() => {
              toggleTicketFileUploadRevisionModal(ticketFileId)
            }}
          >
            <Tooltip title="Add New Version" placement="top-end" className="ml-auto">
              <div>
                <EditIcon className="stroke-halloween-orange" />
              </div>
            </Tooltip>
          </button>
        </>
      )}
      <TicketFileUploadRevisionModal />
    </div>
  )
}
