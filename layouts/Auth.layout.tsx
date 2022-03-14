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
  subtitle: string | ReactElement
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
        className={`m-auto flex flex-col items-center rounded-[4px] bg-white px-[88px] py-[60px] ${className}`}
      >
        <div className="mb-[16px]">
          <Image draggable={false} src={DailyPressLogo} alt="Daily Press" height={65} width={65} />
        </div>
        <div className="select-none font-inter text-[28px] font-semibold">{title}</div>
        <div className="mb-[24px] text-center font-inter text-[16px] font-normal text-nevada">
          {subtitle}
        </div>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
