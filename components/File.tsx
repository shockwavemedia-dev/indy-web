import { FileIcon } from './icons/FileIcon'
import { FolderIcon } from './icons/FolderIcon'

export const File = ({
  onClick,
  href,
  name,
}: {
  onClick?: () => void
  href?: string
  name: string
}) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-20 w-20 flex-none flex-col items-center justify-center space-y-1 rounded-xl border border-bright-gray p-3  hover:border-jungle-green"
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
      className="flex h-20 w-20 flex-none flex-col items-center justify-center space-y-1 rounded-xl border border-bright-gray hover:border-jungle-green"
    >
      <FolderIcon className="stroke-jungle-green" />
      <div className="font-urbanist text-xxs font-semibold capitalize text-onyx">{name}</div>
    </button>
  )
