import { MouseEventHandler } from 'react'
import { CheckboxWrapper } from './Checkbox.wrapper'

export const Checkbox = ({
  label,
  onTick,
  isChecked,
}: {
  label: string
  onTick: MouseEventHandler<HTMLInputElement>
  isChecked: boolean
}) => {
  return (
    <CheckboxWrapper checked={isChecked}>
      <div className="checkbox" onClick={onTick}>
        {isChecked && (
          <svg
            width="10"
            height="11"
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.4375 3.41162L4.0625 7.78643L1.875 5.59912"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div onClick={onTick} draggable={false}>
        {label}
      </div>
    </CheckboxWrapper>
  )
}
