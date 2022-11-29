import Image from 'next/image'
import { ReactNode } from 'react'
import { BadgeCheckIcon } from './icons/BadgeCheckIcon'
import { EditIcon } from './icons/EditIcon'
import { EntryDeclineIcon } from './icons/EntryDeclineIcon'
import { FileIcon } from './icons/FileIcon'
import { FolderIcon } from './icons/FolderIcon'
import { TrashIcon } from './icons/TrashIcon'
import { useDeleteFolderModalStore } from './modals/DeleteFolderModal'
import { useRenameFolderModalStore } from './modals/RenameFolderModal'

export const FileButton = ({
  onClick,
  href,
  name,
  className,
  thumbnailUrl = null,
  fileStatus = '',
  openNewTab = false,
  Icon,
  allowRename = false,
  folderId,
  folderName,
  file = false,
  disabled = false,
  browseAndSelectOnly = false,
}: {
  onClick?: () => void
  href?: string
  name: string
  className?: string
  thumbnailUrl?: string | null
  fileStatus?: string
  openNewTab?: boolean
  Icon?: ReactNode
  allowRename?: boolean
  folderId?: number
  folderName?: string
  file?: boolean
  disabled?: boolean
  browseAndSelectOnly?: boolean
}) => {
  const { toggleModal: toggleRenameFolderModal } = useRenameFolderModalStore()
  const { toggleModal: toggleDeleteFolderModal } = useDeleteFolderModalStore()

  return file ? (
    <a
      href={href}
      onClick={!href && file && onClick ? onClick : undefined}
      target={openNewTab ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className={`disabled relative flex h-35 w-35 flex-none cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-bright-gray p-3 hover:border-halloween-orange ${className}`}
    >
      <div className={`relative mb-1 ${thumbnailUrl ? 'h-16 w-16' : ''}`}>
        {thumbnailUrl ? (
          <Image src={thumbnailUrl} alt={name} height={64} width={64} className="rounded-md" />
        ) : (
          <FileIcon />
        )}
        {!thumbnailUrl && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 font-varela-round text-tiny uppercase text-white">
            {name.split(/\./).pop()}
          </div>
        )}
      </div>
      <div className="w-full break-words text-center text-xxs font-semibold text-onyx">{name}</div>
      {fileStatus === 'approved' && (
        <BadgeCheckIcon className="absolute top-1 right-1 h-5 text-forest-green" />
      )}
      {fileStatus === 'request revision' && (
        <EntryDeclineIcon className="absolute top-1 right-1 h-5 text-red-crimson" />
      )}
    </a>
  ) : (
    <div className="group relative">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`peer relative flex h-35 w-35 flex-none flex-col items-center justify-center rounded-xl border-2 border-bright-gray p-3 hover:border-halloween-orange ${className}`}
      >
        {Icon || <FolderIcon className="mb-3 stroke-halloween-orange" />}
        <div className="break-words text-xs text-onyx">{name}</div>
      </button>
      {allowRename && !browseAndSelectOnly && (
        <>
          <button
            aria-label="Rename Folder"
            type="button"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation()
              toggleRenameFolderModal(folderId, folderName)
            }}
            className="absolute top-3 right-3 hidden group-hover:block"
          >
            <EditIcon className="stroke-waterloo hover:stroke-halloween-orange" />
          </button>
          <button
            aria-label="Delete Folder"
            type="button"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation()
              toggleDeleteFolderModal(folderId, folderName)
            }}
            className="absolute top-3 right-9 hidden group-hover:block"
          >
            <TrashIcon className="stroke-waterloo hover:stroke-halloween-orange" />
          </button>
        </>
      )}
    </div>
  )
}
