import Image from 'next/image'
import { ReactElement } from 'react'
import DailyPressLogo from '../public/images/daily-press-logo.png'

const AuthLayout = ({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: ReactElement | string
  children: ReactElement
}) => (
  <>
    <div className="flex min-h-screen flex-col items-center justify-center bg-ghost-white bg-auth bg-center bg-no-repeat">
      <div className="flex flex-col items-center rounded-xl bg-white px-22 py-15 shadow">
        <div className="mb-4">
          <Image
            draggable={false}
            src={DailyPressLogo}
            alt="Daily Press"
            height="65rem"
            width="65rem"
          />
        </div>
        <div className="mb-2 font-urbanist text-2.5xl font-semibold text-onyx">{title}</div>
        <div className="mb-5 text-center font-urbanist text-base font-medium text-metallic-silver">
          {subtitle}
        </div>
        {children}
      </div>
    </div>
  </>
)

export default AuthLayout
