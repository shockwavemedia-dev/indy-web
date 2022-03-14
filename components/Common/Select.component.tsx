import { useState } from 'react'
import ReactSelect, {
  components,
  DropdownIndicatorProps,
  Options,
  SingleValue,
  StylesConfig,
} from 'react-select'
import { Option } from '../../interfaces/Option.interface'
import CaretDownIcon from './Icons/CaretDown.icon'

const Select = ({
  label,
  name,
  options,
  placeholder,
}: {
  label: string
  name: string
  placeholder: string
  options: Options<Option>
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const handleOnChange = (option: SingleValue<Option>) => {
    setSelectedOption(option)
  }

  const style: StylesConfig<Option, false> = {
    indicatorSeparator: () => {
      return {
        display: 'none',
      }
    },
    placeholder: (base) => {
      return {
        ...base,
        font: '400 14px Inter',
        color: '#717583',
      }
    },
    control: (base) => {
      return {
        ...base,
        borderColor: '#1D212B1A',
        ':hover': {
          borderColor: '#1D212B1A',
        },
        height: '100%',
        boxShadow: 'none',
      }
    },
    container: (base) => {
      return {
        ...base,
        height: '100%',
      }
    },
  }

  const DropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon className={`stroke-black ${props.selectProps.menuIsOpen && 'rotate-180'}`} />
      </components.DropdownIndicator>
    )
  }

  return (
    <div className="flex w-full flex-col">
      <label className="mb-[8px] font-inter text-[12px] font-normal text-mineshaft" htmlFor={name}>
        {label}
      </label>
      <ReactSelect
        styles={style}
        placeholder={placeholder}
        value={selectedOption}
        onChange={handleOnChange}
        options={options}
        components={{ DropdownIndicator }}
        inputId={name}
      />
    </div>
  )
}

export default Select
