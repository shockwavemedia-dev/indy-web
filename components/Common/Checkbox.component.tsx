import { Field } from 'formik'
import { useState } from 'react'
import CheckIcon from './Icons/Check.icon'

const Checkbox = ({ name, label }: { name: string; label: string }) => {
  const [isChecked, setChecked] = useState(false)

  const toggleCheckbox = () => setChecked(!isChecked)

  return (
    <label htmlFor={name} className="flex items-center space-x-3 font-inter text-sm font-normal">
      <Field type="checkbox" name={name} id={name} hidden onClick={toggleCheckbox} />
      <div
        className={`flex min-h-4 min-w-4 items-center justify-center rounded border border-solid border-mineshaft ${
          isChecked && 'bg-mineshaft'
        }`}
      >
        {isChecked && <CheckIcon className="stroke-white" />}
      </div>
      <span>{label}</span>
    </label>
  )
}

export default Checkbox
