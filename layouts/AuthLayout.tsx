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
    <div className="bg-auth flex min-h-screen flex-col items-center justify-center bg-ghost-white bg-center bg-no-repeat">
      <div className="flex flex-col items-center rounded-xl bg-white px-22 py-15 shadow">
        <div className="mb-4">
          <div className="font-circular-std text-5xl text-charleston-green">
            Indy<span className="text-halloween-orange">.</span>
          </div>
        </div>
        <div className="mb-2 font-urbanist text-2.5xl font-semibold text-onyx empty:hidden">
          {title}
        </div>
        <div className="mb-5 text-center font-urbanist text-base font-medium text-metallic-silver">
          {subtitle}
        </div>
        {children}
      </div>
    </div>
  </>
)

export default AuthLayout
