import Image from 'next/image'
import { FileIcon } from './icons/FileIcon'

export const PhotographyVideographyFileButton = ({
  name,
  className,
  thumbnailUrl = null,
  onClick,
}: {
  name: string
  className?: string
  thumbnailUrl?: string | null
  url: string
  fileType: string
  onClick?: () => void
}) => {
  return (
    <>
      <button
        className={`relative flex h-35 w-35 flex-none flex-col items-center justify-center rounded-xl border-2 border-bright-gray p-3 hover:border-halloween-orange ${className}`}
        onClick={onClick}
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
        <div className="w-full break-words text-center text-xxs font-semibold text-onyx">
          {name}
        </div>
      </button>
    </>
  )
}
