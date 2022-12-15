import { Tooltip } from '@mui/material'
import { DisabledIcon } from './icons/DisabledIcon'

export const StatusCountCard = ({
  value,
  description,
  className,
  classNameValue,
  totalAvailable,
  isEnabled,
}: {
  value: number | string
  description: string
  className?: string
  classNameValue?: string
  totalAvailable?: number | string
  isEnabled?: boolean
}) => (
  <div className={`grid place-content-center rounded-xl py-2 ${className} `}>
    <Tooltip
      title={`${isEnabled === false ? 'Sorry but you no longer have access to this service.' : ''}`}
      placement="top"
    >
      <div className={`${isEnabled === false ? 'opacity-40' : ''}`}>
        {isEnabled ? (
          <div className={`mb-1 text-center text-xl font-semibold text-white ${classNameValue} `}>
            {typeof value === 'number' ? Math.abs(value) + '/' + totalAvailable : value}
          </div>
        ) : (
          <div className={`mb-5 !content-center ${classNameValue} `}>
            <DisabledIcon className=" stroke-white" />
          </div>
        )}
        <div className="px-1 text-center text-xs font-medium text-white">{description}</div>
      </div>
    </Tooltip>
  </div>
)
