import Link from 'next/link'

export const LinkButton = ({
  title,
  href,
  light = false,
  className,
}: {
  title: string
  href: string
  light?: boolean
  className?: string
}) => (
  <Link href={href}>
    <a
      className={`flex h-12.5 w-full items-center justify-center space-x-2 rounded-xl text-base font-semibold ${
        light
          ? 'border-1.5 border-solid border-bright-gray bg-white text-onyx'
          : 'bg-halloween-orange text-white'
      } ${className}`}
    >
      {title}
    </a>
  </Link>
)
