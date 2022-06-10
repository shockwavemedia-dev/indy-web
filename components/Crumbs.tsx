import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { CaretIcon } from './icons/CaretIcon'

export const Crumbs = ({ panelName }: { panelName: string }) => {
  const { asPath } = useRouter()

  return (
    <>
      {[panelName, ...asPath.split('/')]
        .filter((s) => s !== '')
        .map((s, i, paths) => (
          <Fragment key={`crumbs-${i}`}>
            <Link href={i === 0 ? '/' : '#'}>
              <a
                className={`font-urbanist text-xs capitalize underline-offset-1 hover:text-halloween-orange hover:underline ${
                  i + 1 === paths.length
                    ? 'mr-auto font-semibold text-halloween-orange'
                    : 'mr-3 font-medium text-waterloo'
                } ${i + 1 === paths.length ? 'pointer-events-none' : ''} `}
              >
                {s.replace('-', ' ')}
              </a>
            </Link>
            {i + 1 !== paths.length && (
              <CaretIcon className="mr-3 rotate-90 stroke-lavender-gray" small />
            )}
          </Fragment>
        ))}
    </>
  )
}
