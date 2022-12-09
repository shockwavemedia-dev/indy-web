import Image from 'next/image'
import { useState } from 'react'

export const FileDisplay = ({
  src,
  type,
  imageAlt,
  href,
  videoClassName,
  imageHeight,
  failedToLoadClassName,
}: {
  src?: string
  type: string
  imageAlt?: string
  href?: string
  videoClassName: string
  imageHeight: string
  failedToLoadClassName?: string
}) => {
  const [failedToLoad, setFailedToLoad] = useState(false)
  const failed = () => setFailedToLoad(true)

  return failedToLoad || !src ? (
    <div
      className={`${
        failedToLoadClassName ? failedToLoadClassName : 'h-70 w-140'
      } grid place-content-center rounded-xl border border-halloween-orange`}
    >
      <div>Failed to load 😵</div>
    </div>
  ) : type === 'video/mp4' ? (
    href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-none flex-col items-center justify-center space-y-1 p-3"
      >
        <video className={videoClassName} onError={failed} loop muted autoPlay>
          <source src={src} />
        </video>
      </a>
    ) : (
      <video className={videoClassName} onError={failed} loop muted autoPlay>
        <source src={src} />
      </video>
    )
  ) : href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-none flex-col items-center justify-center space-y-1 p-3"
    >
      <div className={`relative ${imageHeight}`}>
        <Image className="rounded" src={src} alt={imageAlt} layout="fill" objectFit="contain" />
      </div>
    </a>
  ) : (
    <div className={`relative ${imageHeight}`}>
      <Image className="rounded" src={src} alt={imageAlt} layout="fill" objectFit="contain" />
    </div>
  )
}
