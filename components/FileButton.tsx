import Image from 'next/image'
import { ReactNode } from 'react'
import { BadgeCheckIcon } from './icons/BadgeCheckIcon'
import { EditIcon } from './icons/EditIcon'
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
}) => {
  const { toggleModal: toggleRenameFolderModal } = useRenameFolderModalStore()
  const { toggleModal: toggleDeleteFolderModal } = useDeleteFolderModalStore()

  return href ? (
    <a
      href={href}
      target={openNewTab ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className={`relative flex h-35 w-35 flex-none flex-col items-center justify-center rounded-xl border-2 border-bright-gray p-3 hover:border-halloween-orange ${className}`}
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
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex h-35 w-35 flex-none flex-col items-center justify-center rounded-xl border-2 border-bright-gray p-3 hover:border-halloween-orange ${className}`}
    >
      <>
        {allowRename && (
          <div className="absolute top-2 right-2 hidden space-x-2 group-hover:flex">
            <button
              aria-label="Rename Folder"
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                toggleRenameFolderModal(folderId, folderName)
              }}
            >
              <EditIcon className="stroke-waterloo hover:stroke-halloween-orange" />
            </button>
            <button
              aria-label="Delete Folder"
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                toggleDeleteFolderModal(folderId, folderName)
              }}
            >
              <TrashIcon className="stroke-waterloo hover:stroke-halloween-orange" />
            </button>
          </div>
        )}
        {Icon || <FolderIcon className="mb-3 stroke-halloween-orange" />}
        <div className="break-words text-xs text-onyx">{name}</div>
      </>
    </button>
  )
}
