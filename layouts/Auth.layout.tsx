import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import DailyPressLogo from '../public/images/daily-press-logo.png'

const AuthLayout = ({
  title,
  subtitle,
  children,
  className,
  needsAuth = false,
}: {
  title: string
  subtitle: ReactElement | string
  children: ReactElement
  className: string
  needsAuth?: boolean
}) => {
  const { replace } = useRouter()
  const { status } = useSession()

  if (needsAuth) {
    if (status === 'loading') {
      return null
    }

    if (status === 'authenticated') {
      replace('/dashboard')
      return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-shark">
      <div
        className={`m-auto flex flex-col items-center rounded bg-white px-22 py-15 ${className}`}
      >
        <div className="mb-4">
          <Image
            draggable={false}
            src={DailyPressLogo}
            alt="Daily Press"
            height="65rem"
            width="65rem"
          />
        </div>
        <div className="select-none font-inter text-2.5xl font-semibold">{title}</div>
        <div className="mb-6 text-center font-inter text-base font-normal text-nevada">
          {subtitle}
        </div>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
