import Image from 'next/image'
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
}: {
  onClick?: () => void
  href?: string
  name: string
  className?: string
  thumbnailUrl?: string | null
  fileStatus?: string
  openNewTab?: boolean
}) =>
  href ? (
    <a
      href={href}
      target={openNewTab ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className={`grid h-35 w-35 flex-none place-items-center space-y-1 rounded-xl border-2 border-bright-gray p-3 hover:border-halloween-orange ${className}`}
    >
      <div className="relative">
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
      {fileStatus === 'approved' && <BadgeCheckIcon className="h-5 text-forest-green" />}
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-35 w-35 flex-none flex-col items-center justify-center space-y-3 rounded-xl border-2 border-bright-gray p-3 hover:border-halloween-orange ${className}`}
    >
      <FolderIcon className="stroke-halloween-orange" />
      <div className="break-words text-xs text-onyx">{name}</div>
    </button>
  )
