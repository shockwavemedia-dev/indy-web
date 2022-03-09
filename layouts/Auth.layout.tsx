import Image from 'next/image'
import { ReactElement } from 'react'
import DailyPressLogo from '../public/images/daily-press-logo.png'

const AuthLayout = ({
  title,
  subtitle,
  children,
  className,
}: {
  title: string
  subtitle: string | ReactElement
  children: ReactElement
  className: string
}) => {
  return (
    <div className="bg-shark flex min-h-screen flex-col">
      <div
        className={`m-auto flex flex-col items-center rounded-[4px] bg-white px-[88px] py-[60px] ${className}`}
      >
        <div className="mb-[16px] select-none">
          <Image draggable={false} src={DailyPressLogo} alt="Daily Press" height={65} width={65} />
        </div>
        <div className="select-none font-inter text-[28px] font-semibold">{title}</div>
        <div className="text-nevada mb-[24px] select-none text-center font-inter text-[16px] font-normal">
          {subtitle}
        </div>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
