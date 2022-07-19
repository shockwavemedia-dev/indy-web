import Image from 'next/image'
import { ReactNode } from 'react'
import { BadgeCheckIcon } from './icons/BadgeCheckIcon'
import { FileIcon } from './icons/FileIcon'
import { FolderIcon } from './icons/FolderIcon'

export const FileButton = ({
  onClick,
  href,
  name,
  className,
  thumbnailUrl = null,
  fileStatus = '',
  openNewTab = false,
  Icon,
}: {
  onClick?: () => void
  href?: string
  name: string
  className?: string
  thumbnailUrl?: string | null
  fileStatus?: string
  openNewTab?: boolean
  Icon?: ReactNode
}) =>
  href ? (
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
      className={`flex h-35 w-35 flex-none flex-col items-center justify-center space-y-3 rounded-xl border-2 border-bright-gray p-3 hover:border-halloween-orange ${className}`}
    >
      <>
        {Icon || <FolderIcon className="stroke-halloween-orange" />}
        <div className="break-words text-xs text-onyx">{name}</div>
      </>
    </button>
  )
