import { ReactElement, ReactNode } from 'react'

const AuthLayout = ({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: ReactNode
  children: ReactElement
}) => (
  <>
    <div className="bg-auth flex min-h-screen flex-col items-center justify-center bg-charleston-green bg-center bg-no-repeat">
      <div className="flex flex-col items-center rounded-xl px-22 py-15 shadow">
        <div className="mb-4">
          <div className="font-circular-std text-5xl text-white">
            Indy<span className="text-halloween-orange">.</span>
          </div>
        </div>
        <div className="mb-2 font-urbanist text-2.5xl font-semibold text-halloween-orange empty:hidden">
          {title}
        </div>
        <div className="mb-5 text-center font-urbanist text-base font-medium text-white">
          {subtitle}
        </div>
        {children}
      </div>
    </div>
  </>
)

export default AuthLayout
