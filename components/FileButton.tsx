import Image from 'next/image'
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
}: {
  onClick?: () => void
  href?: string
  name: string
  className?: string
  fileModal?: boolean
  textClassName?: string
  thumbnailUrl?: string | null
}) =>
  href ? (
    <a
      href={href}
      rel="noopener noreferrer"
      className={`flex flex-none flex-col items-center justify-center space-y-1 rounded-xl border-2 border-bright-gray p-3 hover:border-halloween-orange ${className}`}
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
      <div className="w-full break-words text-center font-urbanist text-xxs font-semibold text-onyx">
        {name}
      </div>
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-none flex-col items-center justify-center space-y-1 rounded-xl border-2 border-bright-gray p-3 hover:border-halloween-orange ${className}`}
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
  )
