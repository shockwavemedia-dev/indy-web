import { Tooltip } from '@mui/material'
import {
  ClearIndicatorProps,
  components as Components,
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  MultiValueRemoveProps,
  Props,
} from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { SelectOption } from '../types/SelectOption.type'
import { FormErrorMessage } from './FormErrorMessage'
import { CaretIcon } from './icons/CaretIcon'
import { ClearSelectIcon } from './icons/ClearSelectIcon'
import { RemoveMultiValueIcon } from './icons/RemoveMultiValueIcon'

const SelectContainer = <Option, IsMulti extends boolean>({
  children,
  ...props
}: ContainerProps<Option, IsMulti>) => (
  <Components.SelectContainer {...props}>
    <label className="mb-2 inline-block text-xs font-medium text-metallic-silver empty:hidden">
      {props.selectProps.label}
    </label>
    {children}
    {props.selectProps.name && <FormErrorMessage name={props.selectProps.name} />}
  </Components.SelectContainer>
)

const DropdownIndicator = <Option, IsMulti extends boolean>(
  props: DropdownIndicatorProps<Option, IsMulti>
) => (
  <Components.DropdownIndicator {...props}>
    <CaretIcon
      className={`invisible stroke-waterloo transition-transform group-hover:visible ${
        props.selectProps.menuIsOpen ? 'rotate-0' : 'rotate-180'
      }`}
    />
  </Components.DropdownIndicator>
)

const Control = <Option, IsMulti extends boolean>({
  children,
  ...props
}: ControlProps<Option, IsMulti>) => (
  <Components.Control {...props}>
    {props.selectProps.Icon && <props.selectProps.Icon className="mr-2.5 stroke-lavender-gray" />}
    {children}
  </Components.Control>
)

const MultiValueRemove = <Option, IsMulti extends boolean>(
  props: MultiValueRemoveProps<Option, IsMulti>
) => (
  <Components.MultiValueRemove {...props}>
    <RemoveMultiValueIcon className="hidden stroke-waterloo hover:stroke-tart-orange group-hover:block" />
  </Components.MultiValueRemove>
)

const ClearIndicator = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: ClearIndicatorProps<Option, IsMulti, Group>
) => (
  <Components.ClearIndicator {...props}>
    <Tooltip title="Clear" placement="top">
      <div>
        <ClearSelectIcon className="invisible stroke-waterloo hover:stroke-tart-orange group-hover:visible" />
      </div>
    </Tooltip>
  </Components.ClearIndicator>
)

export const SocialMediaChannelSelect = <
  SocialMediaChannel,
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption<SocialMediaChannel>> = GroupBase<
    SelectOption<SocialMediaChannel>
  >
>({
  onChange,
  ...props
}: Props<SelectOption<SocialMediaChannel>, IsMulti, Group> & {}) => (
  <CreatableSelect
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
        minHeight: '1.5rem',
        boxShadow: isFocused ? '0 0 0 2px #F25D23' : `none`,
        border: 'none',
        padding: '0 0.5rem 0',
        backgroundColor: '#ffffff',
        transition: 'none',
      }),
      container: (base) => ({
        ...base,
        borderRadius: 12,
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
        backgroundColor: isSelected ? '#F25D23 !important' : '#FFFFFF',
        ':hover': {
          backgroundColor: '#F25D2333',
        },
      }),
      menu: (base) => ({
        ...base,
        zIndex: 20,
        overflow: 'clip',
      }),
      noOptionsMessage: (base) => ({
        ...base,
        font: '500 0.875rem/1.25rem Urbanist',
      }),
      dropdownIndicator: (base) => ({
        ...base,
        cursor: 'pointer',
        padding: 0,
        margin: 0,
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
        margin: 0,
      }),
      multiValue: ({ backgroundColor }, { data: { value } }) => ({
        display: 'flex',
        backgroundColor: (() => {
          switch (value as unknown as string) {
            case 'Story':
              return '#fbd0d9'
            case 'Facebook':
              return '#f8eed3'
            case 'Instagram':
              return '#ccccff'
            case 'Twitter':
              return '#d6f5d6'
            case 'Linkedin':
              return '#f5d6f4'
            default:
              return backgroundColor
          }
        })(),
        paddingLeft: '.625rem',
        paddingRight: '.625rem',
        borderRadius: 8,
      }),
      multiValueLabel: (_, { data: { value } }) => ({
        font: '500 0.875rem/1.25rem Urbanist',
        color: (() => {
          switch (value as unknown as string) {
            case 'Story':
              return '#DC143C'
            case 'Facebook':
              return '#DAA520'
            case 'Instagram':
              return '#000080'
            case 'Twitter':
              return '#228B22'
            case 'Linkedin':
              return '#DA70D6'
            default:
              return '#32343D'
          }
        })(),
      }),
      multiValueRemove: () => ({
        height: 'fit-content',
        margin: 'auto 0 auto .25rem',
      }),
    }}
    components={{
      SelectContainer,
      DropdownIndicator,
      Control,
      MultiValueRemove,
      ClearIndicator,
    }}
    onChange={onChange}
  />
)
