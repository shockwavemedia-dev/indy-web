import { FileIcon } from './icons/FileIcon'
import { FolderIcon } from './icons/FolderIcon'

export const FileButton = ({
  onClick,
  href,
  name,
  className,
  fileModal = false,
  textClassName,
}: {
  onClick?: () => void
  href?: string
  name: string
  className?: string
  fileModal?: boolean
  textClassName?: string
}) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-none flex-col items-center justify-center space-y-1 rounded-xl border-2 border-bright-gray p-3 hover:border-jungle-green ${className}`}
    >
      <div className="relative">
        <FileIcon />
        <div className="absolute top-3 left-1/2 -translate-x-1/2 font-varela-round text-tiny uppercase text-white">
          {name.split(/\./).pop()}
        </div>
      </div>
      <div className="w-full break-words text-center font-urbanist text-xxs font-semibold text-onyx">
        {name}
      </div>
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-none flex-col items-center justify-center space-y-1 rounded-xl border-2 border-bright-gray p-3 hover:border-jungle-green ${className}`}
    >
      {fileModal ? (
        <div className="relative">
          <FileIcon />
          <div className="absolute top-3 left-1/2 -translate-x-1/2 font-varela-round text-tiny uppercase text-white">
            {name.split(/\./).pop()}
          </div>
        </div>
      ) : (
        <FolderIcon className="stroke-jungle-green" />
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
