import Link from 'next/link'
import { Navigation } from '../../interfaces/Navigation.interface'
import CaretRightIcon from '../Common/Icons/CaretRight.icon'

const NavigationButton = ({
  navigation,
  isCurrentPath,
}: {
  navigation: Navigation
  isCurrentPath: boolean
}) => {
  return (
    <div className="flex cursor-pointer items-center justify-end space-x-[12px]">
      <div
        className={`inline-block h-[20px] w-[20px] rounded-full ${
          isCurrentPath ? 'bg-white' : 'bg-abbey'
        }`}
      />
      {navigation.children ? (
        <button
          className={`font-400 flex flex-1 items-center justify-between font-inter text-[14px] ${
            isCurrentPath ? 'text-white' : 'text-santasgray'
          }`}
        >
          <div>{navigation.title}</div>
          <CaretRightIcon className="stroke-stormgray" />
        </button>
      ) : (
        <Link href={navigation.pathname || '#'} passHref>
          <div
            className={`font-400 flex-1 font-inter text-[14px] ${
              isCurrentPath ? 'text-white' : 'text-santasgray'
            }`}
          >
            {navigation.title}
          </div>
        </Link>
      )}
    </div>
  )
}

export default NavigationButton
