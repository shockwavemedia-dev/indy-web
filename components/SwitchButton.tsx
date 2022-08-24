import { Switch } from '@mui/material'
import { Field } from 'formik'
import { useState } from 'react'

export const SwitchButton = ({
  name,
  label,
  className,
  value,
}: {
  name?: string
  label: string
  className?: string
  value?: boolean
}) => {
  const [toggle, setToggle] = useState(value)

  const handleToggle = () => {
    toggle ? setToggle(false) : setToggle(true)
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      <label
        htmlFor={`${name}-${value}`}
        className="right block h-fit select-none text-base font-bold text-onyx"
      >
        <Field component={Switch} name={name} onChange={handleToggle} checked={toggle} />
        {label}
      </label>
    </div>
  )
}
