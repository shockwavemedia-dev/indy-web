import Image from 'next/image'
import { useState } from 'react'

export const FileDisplay = ({
  src,
  type,
  imageHeight,
  imageWidth,
  imageAlt,
  className,
}: {
  src: string
  type: string
  imageHeight?: number
  imageWidth?: number
  imageAlt?: string
  className?: string
}) => {
  const [failedToLoad, setFailedToLoad] = useState(false)
  const failed = () => setFailedToLoad(true)

  return failedToLoad ? (
    <div className="grid h-70 w-140 place-content-center rounded-xl border border-halloween-orange">
      <div>Failed to load 😵</div>
    </div>
  ) : type === 'video/mp4' ? (
    <video className={`${className}`} onError={failed} loop muted autoPlay>
      <source src={src} />
    </video>
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
