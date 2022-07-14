import Image from 'next/image'
import { useState } from 'react'
import {
  FileFolderDeleteModal,
  useFileFolderDeleteModalStore,
} from '../components/modals/FileFolderDeleteModal'
import {
  FileFolderRenameModal,
  useFileFolderRenameModalStore,
} from '../components/modals/FileFolderRenameModal'
import { BadgeCheckIcon } from './icons/BadgeCheckIcon'
import { DotsHorizontalIcon } from './icons/DotsHorizontalIcon'
import { FileIcon } from './icons/FileIcon'
import { FolderIcon } from './icons/FolderIcon'

export const FileButton = ({
  onClick,
  href,
  name,
  className,
  fileModal = false,
  textClassName,
  thumbnailUrl = null,
  fileStatus = null,
  showAction = false,
}: {
  onClick?: () => void
  href?: string
  name: string
  className?: string
  fileModal?: boolean
  textClassName?: string
  thumbnailUrl?: string | null
  fileStatus?: string | null
  showAction?: Boolean
}) => {
  const [actionVisible, setActionVisible] = useState(false)

  const toggleAction = () => setActionVisible(!actionVisible)

  const { toggleModal: toggleFileFolderRenameModal } = useFileFolderRenameModalStore()

  const { toggleModal: toggleFileFolderDeleteModal } = useFileFolderDeleteModalStore()

  return href ? (
    <a
      href={href}
      rel="noopener noreferrer"
      className={`flex flex-none flex-col items-center justify-center space-y-1 rounded-xl border-2 border-bright-gray p-3 hover:border-halloween-orange ${className}`}
    >
      <div className="relative">
        {thumbnailUrl ? (
          <Image src={thumbnailUrl} alt={name} height={64} width={64} className="rouned-md" />
        ) : (
          <FileIcon />
        )}
        {!thumbnailUrl && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 font-varela-round text-tiny uppercase text-white">
            {name.split(/\./).pop()}
          </div>
        )}
      </div>
      <div className="w-full break-words text-center font-urbanist text-xxs font-semibold text-onyx">
        {name}
      </div>
      {fileStatus === 'approved' ? (
        <BadgeCheckIcon className="text-forest-green"></BadgeCheckIcon>
      ) : (
        <div className="w-full break-words text-center font-urbanist text-xxs font-semibold text-onyx"></div>
      )}
    </a>
  ) : (
    <div>
      <div
        className={`flex flex-col items-center justify-center space-y-1 rounded-xl border-2 border-bright-gray p-3 hover:border-halloween-orange ${className}`}
      >
        <div className={`flex flex-none flex-col items-center justify-center space-y-1 p-3`}>
          <button
            type="button"
            onClick={onClick}
            className="flex flex-none flex-col items-center justify-center space-y-1"
          >
            {fileModal ? (
              <div className="relative">
                <FileIcon />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 font-varela-round text-tiny uppercase text-white">
                  {name.split(/\./).pop()}
                </div>
              </div>
            ) : (
              <FolderIcon className="stroke-halloween-orange" />
            )}
            <div
              className={` ${
                textClassName ? textClassName : 'text-xxs'
              } font-urbanist font-semibold text-onyx ${!fileModal ? 'capitalize' : ''}`}
            >
              {name}
            </div>
          </button>
        </div>
      </div>
      {showAction && (
        <button className="flex justify-end" onClick={toggleAction}>
          <DotsHorizontalIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
        </button>
      )}
      {actionVisible && (
        <div className="z-10 w-full divide-y rounded bg-ghost-white shadow">
          <ul className="py-1 text-sm">
            <li>
              <button
                onClick={toggleFileFolderRenameModal}
                className="block px-4 py-2 dark:hover:text-halloween-orange"
              >
                Rename
              </button>
              <FileFolderRenameModal folderId={1} folderName="grand child folder C" />
            </li>
            <li>
              <button
                onClick={toggleFileFolderDeleteModal}
                className="block px-4 py-2 dark:hover:text-halloween-orange"
              >
                Delete
              </button>
              <FileFolderDeleteModal folderId={1} folderName="grand child folder C" />
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
