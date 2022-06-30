import Image from 'next/image'
import { useState } from 'react'

export const FileDisplay = ({
  src,
  type,
  imageHeight,
  imageWidth,
  imageAlt,
  className,
  href,
  videoClassName,
  failedToLoadClassName,
}: {
  src: string
  type: string
  imageHeight: number
  imageWidth: number
  imageAlt: string
  className?: string
  href?: string
  videoClassName: string
  failedToLoadClassName?: string
}) => {
  const [failedToLoad, setFailedToLoad] = useState(false)
  const failed = () => setFailedToLoad(true)

  return failedToLoad ? (
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
        <video className={`${videoClassName}`} onError={failed} loop muted autoPlay>
          <source src={src} />
        </video>
      </a>
    ) : (
      <video className={`${videoClassName}`} onError={failed} loop muted autoPlay>
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
      <Image
        className={`${className}`}
        src={src}
        height={`${imageHeight}`}
        width={`${imageWidth}`}
        alt={imageAlt}
      />
    </a>
  ) : (
    <Image
      className={`${className}`}
      src={src}
      height={`${imageHeight}`}
      width={`${imageWidth}`}
      alt={imageAlt}
    />
  )
}
