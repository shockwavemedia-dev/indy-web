import ReactSelect, { components as Components, Props } from 'react-select'
import CaretIcon from './icons/CaretIcon'
import ClearSelectIcon from './icons/ClearSelectIcon'
import RemoveMultiValueIcon from './icons/RemoveMultiValueIcon'

const Select = <Option, IsMulti extends boolean = false>(props: Props<Option, IsMulti>) => (
  <ReactSelect
    {...props}
    styles={{
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
        width: '100%',
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
    }}
    components={{
      SelectContainer: ({ children, ...props }) => (
        <Components.SelectContainer {...props}>
          <label className="mb-2 inline-block font-urbanist text-xs font-medium text-metallic-silver empty:hidden">
            {props.selectProps.label}
          </label>
          {children}
        </Components.SelectContainer>
      ),
      DropdownIndicator: (props) => (
        <Components.DropdownIndicator {...props}>
          <CaretIcon
            className={`stroke-waterloo ${
              props.selectProps.menuIsOpen ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </Components.DropdownIndicator>
      ),
      Control: ({ children, ...props }) => (
        <Components.Control {...props}>
          <props.selectProps.Icon className="mr-2.5 stroke-lavender-gray" />
          {children}
        </Components.Control>
      ),
      MultiValueRemove: (props) => (
        <Components.MultiValueRemove {...props}>
          <RemoveMultiValueIcon className="stroke-waterloo hover:stroke-tart-orange" />
        </Components.MultiValueRemove>
      ),
      ClearIndicator: (props) => (
        <Components.ClearIndicator {...props} className="group">
          <ClearSelectIcon className="stroke-waterloo group-hover:stroke-tart-orange" />
        </Components.ClearIndicator>
      ),
    }}
  />
)

export default Select
