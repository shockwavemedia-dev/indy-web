import Link from 'next/link'
import { Navigation } from '../../interfaces/Navigation.interface'

const ChildNavigationButton = ({
  navigation,
  isCurrentPath,
}: {
  navigation: Navigation
  isCurrentPath: boolean
}) => {
  return (
    <div className="flex cursor-pointer items-center space-x-[12px]">
      <div
        className={`inline-block h-[6px] w-[6px] rounded-full  ${
          isCurrentPath ? 'bg-white' : 'bg-abbey'
        }`}
      />
      <Link href={navigation.pathname || '#'} passHref>
        <div
          className={`font-400 flex-1 font-inter text-[14px] ${
            isCurrentPath ? 'text-white' : 'text-santasgray'
          }`}
        >
          {navigation.title}
        </div>
      </Link>
    </div>
  )
}

export default ChildNavigationButton
