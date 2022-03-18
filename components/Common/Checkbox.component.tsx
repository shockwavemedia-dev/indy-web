import { Field } from 'formik'
import { useState } from 'react'
import CheckIcon from './Icons/Check.icon'

const Checkbox = ({ name, label }: { name: string; label: string }) => {
  const [isChecked, setChecked] = useState(false)

  const toggleCheckbox = () => setChecked(!isChecked)

  return (
    <label
      htmlFor={name}
      className="flex items-center space-x-[12px] font-inter text-[14px] font-normal"
    >
      <Field type="checkbox" name={name} id={name} hidden onClick={toggleCheckbox} />
      <div
        className={`flex min-h-[16px] min-w-[16px] items-center justify-center rounded-[4px] border border-solid border-mineshaft ${
          isChecked && 'bg-mineshaft'
        }`}
      >
        {isChecked && <CheckIcon />}
      </div>
      <span>{label}</span>
    </label>
  )
}

export default Checkbox
