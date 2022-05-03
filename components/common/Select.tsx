import { useFormikContext } from 'formik'
import ReactSelect, {
  ClearIndicatorProps,
  components as Components,
  ControlProps,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
  Options,
  PropsValue,
  StylesConfig,
} from 'react-select'
import { Icon } from '../../types/Icon.type'
import { Option } from '../../types/Option.type'
import { isMultiValue, isSingleValue } from '../../utils/SelectHelpers'
import CaretIcon from './icons/CaretIcon'
import ClearSelectIcon from './icons/ClearSelectIcon'
import RemoveMultiValueIcon from './icons/RemoveMultiValueIcon'

const DropdownIndicator = <T extends unknown>(
  props: DropdownIndicatorProps<Option<T>, boolean>
) => (
  <Components.DropdownIndicator {...props}>
    <CaretIcon
      className={`stroke-waterloo ${props.selectProps.menuIsOpen ? 'rotate-0' : 'rotate-180'}`}
    />
  </Components.DropdownIndicator>
)

const Control = <T extends unknown>({ children, ...props }: ControlProps<Option<T>, boolean>) => (
  <Components.Control {...props}>
    <props.selectProps.Icon className="mr-2.5 stroke-lavender-gray" />
    {children}
  </Components.Control>
)

const ClearIndicator = <T extends unknown>(props: ClearIndicatorProps<Option<T>, boolean>) => (
  <Components.ClearIndicator {...props} className="group">
    <ClearSelectIcon className="stroke-waterloo group-hover:stroke-tart-orange" />
  </Components.ClearIndicator>
)

const MultiValueRemove = <T extends unknown>(props: MultiValueRemoveProps<Option<T>, boolean>) => (
  <Components.MultiValueRemove {...props}>
    <RemoveMultiValueIcon className="stroke-waterloo hover:stroke-tart-orange" />
  </Components.MultiValueRemove>
)

const styles: StylesConfig<Option<unknown>, boolean> = {
  indicatorSeparator: () => ({
    display: 'none',
  }),
  placeholder: (base) => ({
    ...base,
    font: '500 0.875rem/1.25rem Urbanist',
    color: '#ABABB9',
    margin: 0,
  }),
  control: (base, { isFocused }) => ({
    ...base,
    minHeight: '3.125rem',
    boxShadow: isFocused ? '0 0 0 2px #AAE2CB' : '0 0 0 1px #E8E8EF',
    border: 'none',
    borderRadius: '.75rem',
    padding: '0 1.5rem 0',
    backgroundColor: '#ffffff',
  }),
  container: (base) => ({
    ...base,
    borderRadius: '0.75rem',
  }),
  input: (base) => ({
    ...base,
    color: '#32343D',
    font: '500 0.875rem/1.25rem Urbanist',
    margin: 0,
    padding: 0,
  }),
  singleValue: (base) => ({
    ...base,
    color: '#32343D',
    font: '500 0.875rem/1.25rem Urbanist',
  }),
  option: (base, { isSelected }) => ({
    ...base,
    color: isSelected ? '#FFFFFF' : '#32343D',
    font: '500 0.875rem/1.25rem Urbanist',
    backgroundColor: isSelected ? '#2BB67D !important' : '#FFFFFF',
    ':hover': {
      backgroundColor: '#E9FAF3',
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 20,
  }),
  noOptionsMessage: (base) => ({
    ...base,
    font: '500 0.875rem/1.25rem Urbanist',
  }),
  dropdownIndicator: () => ({
    marginLeft: '.625rem',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '.25rem 0',
    gap: '.25rem',
  }),
  clearIndicator: (base) => ({
    ...base,
    cursor: 'pointer',
    padding: 0,
  }),
  multiValue: () => ({
    display: 'flex',
    border: '1px solid #E8E8EF',
    paddingLeft: '.625rem',
    paddingRight: '.625rem',
    borderRadius: 8,
  }),
  multiValueLabel: () => ({
    font: '500 0.875rem/1.25rem Urbanist',
    color: '#32343D',
  }),
  multiValueRemove: () => ({
    height: 'fit-content',
    margin: 'auto 0 auto .25rem',
  }),
}

const Select = <T extends unknown>({
  name,
  Icon,
  placeholder,
  options,
  className,
  label,
  onChange,
  disabled = false,
  defaultValue,
  readOnly = false,
  multi = false,
}: {
  name?: string
  Icon: Icon
  placeholder?: string
  options: Options<Option<T>>
  className?: string
  label?: string
  onChange?: (option: PropsValue<Option<T>>) => void
  disabled?: boolean
  defaultValue?: PropsValue<Option<T>>
  readOnly?: boolean
  multi?: boolean
}) => {
  const { setFieldValue } = useFormikContext()

  const selectOption = <T extends unknown>(option: PropsValue<Option<T>>) => {
    if (name) {
      if (isSingleValue(option)) {
        setFieldValue(name, option?.value)
      } else if (isMultiValue(option)) {
        setFieldValue(
          name,
          option.map((value) => value)
        )
      }
    }

    if (onChange) {
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <label className="mb-2 inline-block font-urbanist text-xs font-medium text-metallic-silver empty:hidden">
        {label}
      </label>
      <ReactSelect
        styles={styles}
        placeholder={placeholder}
        onChange={selectOption}
        options={options}
        components={{ DropdownIndicator, Control, ClearIndicator, MultiValueRemove }}
        inputId={name}
        isDisabled={disabled || readOnly}
        Icon={Icon}
        isMulti={multi}
        closeMenuOnSelect={!multi}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default Select
