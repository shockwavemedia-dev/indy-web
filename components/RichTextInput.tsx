import {
  CompositeDecorator,
  ContentBlock,
  convertFromRaw,
  convertToRaw,
  DraftDecoratorComponentProps,
  Editor,
  EditorCommand,
  EditorState,
  getDefaultKeyBinding,
  Modifier,
  RichUtils,
} from 'draft-js'
import 'draft-js/dist/Draft.css'
import { useFormikContext } from 'formik'
import { KeyboardEvent, ReactNode, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { useCreateLinkModalStore } from '../store/CreateLinkModalStore'
import { CreateLinkForm } from '../types/forms/CreateLinkForm.type'
import { Icon } from '../types/Icon.type'
import { FormErrorMessage } from './FormErrorMessage'
import { BoldIcon } from './icons/BoldIcon'
import { ItalicIcon } from './icons/ItalicIcon'
import { LinkIcon } from './icons/LinkIcon'
import { StrikethroughIcon } from './icons/StrikethroughIcon'
import { TextCenterAlignmentIcon } from './icons/TextCenterAlignmentIcon'
import { TextRightAlignmentIcon } from './icons/TextRightAlignmentIcon'
import { UnderlineIcon } from './icons/UnderlineIcon'
import { UnorderedListIcon } from './icons/UnorderedListIcon'

export const RichTextInput = ({
  name,
  Icon,
  placeholder,
  className,
  label,
  inputActions,
  labelClassName,
  size,
}: {
  name: string
  Icon: Icon
  placeholder: string
  className?: string
  label?: string
  inputActions?: ReactNode
  labelClassName?: string
  size?: string
}) => {
  const { handleBlur, setFieldValue, getFieldProps } = useFormikContext()
  const { toggleModal, setCreateLink, setLinkText } = useCreateLinkModalStore()

  const initialValue = getFieldProps<string>(name).value

  const [editorState, setEditorState] = useState(
    initialValue
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(initialValue)), compositeDecorator)
      : EditorState.createEmpty(compositeDecorator)
  )
  const [isEditorFocused, setEditorFocused] = useState(false)
  const [isPlaceholderVisible, setPlaceHolderVisible] = useState(true)

  const editorRef = useRef<Editor>(null)

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState)
    setFieldValue(name, JSON.stringify(convertToRaw(editorState.getCurrentContent())))
  }

  const handleKeyCommand = (command: EditorCommand, editorState: EditorState) => {
    const newEditorState = RichUtils.handleKeyCommand(editorState, command)

    if (newEditorState) {
      setEditorState(newEditorState)
      return 'handled'
    }

    return 'not-handled'
  }
  const keyBindingFn = (e: KeyboardEvent) => {
    if (e.code === 'Tab') {
      setEditorState(RichUtils.onTab(e, editorState, 4))
    }

    return getDefaultKeyBinding(e)
  }
  const onFocus = () => setEditorFocused(true)
  const onBlur = (e: SyntheticEvent) => {
    setEditorFocused(false)
    handleBlur({ ...e, target: { name } })
  }

  const italicOnClick = () => setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
  const boldOnClick = () => setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  const underlineOnClick = () =>
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
  const strikethroughOnClick = () =>
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'))
  const textCenterAlignmentOnClick = () =>
    setEditorState(RichUtils.toggleBlockType(editorState, 'center-align'))
  const textRightAlignmentOnClick = () =>
    setEditorState(RichUtils.toggleBlockType(editorState, 'right-align'))
  const unorderedListOnClick = () =>
    setEditorState(RichUtils.toggleBlockType(editorState, 'unordered-list-item'))
  const toggleCreateLinkModal = () => {
    const selection = editorState.getSelection()
    const currentContent = editorState.getCurrentContent()

    setCreateLink(({ text, link }: CreateLinkForm) => {
      onChange(
        EditorState.createWithContent(
          Modifier.replaceText(
            currentContent,
            selection,
            text,
            editorState.getCurrentInlineStyle(),
            currentContent
              .createEntity('LINK', 'MUTABLE', {
                link,
              })
              .getLastCreatedEntityKey()
          ),
          compositeDecorator
        )
      )
      editorRef.current?.focus()
    })

    setLinkText(
      currentContent
        .getBlockForKey(selection.getAnchorKey())
        .getText()
        .slice(selection.getStartOffset(), selection.getEndOffset())
    )
    toggleModal()
  }
  const blockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType()

    if (type === 'right-align') {
      return 'flex justify-end'
    } else if (type === 'center-align') {
      return 'flex justify-center'
    }

    return ''
  }

  useEffect(() => {
    const currentContent = editorState.getCurrentContent()
    setPlaceHolderVisible(
      currentContent.hasText() || currentContent.getBlockMap().first().getType() === 'unstyled'
    )
  }, [editorState])

  useEffect(() => {
    if (!initialValue) {
      setEditorState(EditorState.createEmpty(compositeDecorator))
    }
  }, [initialValue])

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className={`mb-2 inline-block font-urbanist font-medium text-metallic-silver empty:hidden ${labelClassName}`}
      >
        {label}
      </label>
      <div
        className={`${size} relative overflow-hidden rounded-xl bg-white ${
          isEditorFocused ? 'ring-2 ring-halloween-orange' : 'ring-1 ring-bright-gray '
        }`}
        id="rich-text-input"
      >
        <div className="flex space-x-2 bg-ghost-white px-4 py-1.5">
          <StyleButton
            Icon={ItalicIcon}
            onClick={italicOnClick}
            isActive={editorState.getCurrentInlineStyle().has('ITALIC')}
          />
          <StyleButton
            Icon={BoldIcon}
            onClick={boldOnClick}
            isActive={editorState.getCurrentInlineStyle().has('BOLD')}
          />
          <StyleButton
            Icon={UnderlineIcon}
            onClick={underlineOnClick}
            isActive={editorState.getCurrentInlineStyle().has('UNDERLINE')}
          />
          <StyleButton
            Icon={StrikethroughIcon}
            onClick={strikethroughOnClick}
            isActive={editorState.getCurrentInlineStyle().has('STRIKETHROUGH')}
          />
          <StyleButton Icon={LinkIcon} onClick={toggleCreateLinkModal} />
          <StyleButton
            Icon={TextCenterAlignmentIcon}
            onClick={textCenterAlignmentOnClick}
            isActive={RichUtils.getCurrentBlockType(editorState) === 'center-align'}
            stroke
          />
          <StyleButton
            Icon={TextRightAlignmentIcon}
            onClick={textRightAlignmentOnClick}
            isActive={RichUtils.getCurrentBlockType(editorState) === 'right-align'}
            stroke
          />
          <StyleButton
            Icon={UnorderedListIcon}
            onClick={unorderedListOnClick}
            isActive={
              editorState
                .getCurrentContent()
                .getBlockForKey(editorState.getSelection().getStartKey())
                .getType() === 'unordered-list-item'
            }
            stroke
          />
        </div>
        <Icon className="pointer-events-none absolute ml-6 mt-4 stroke-lavender-gray" />
        <Editor
          blockStyleFn={blockStyleFn}
          placeholder={isPlaceholderVisible ? placeholder : undefined}
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          onFocus={onFocus}
          onBlur={onBlur}
          spellCheck={false}
          keyBindingFn={keyBindingFn}
          ref={editorRef}
        />
        {inputActions}
      </div>
      <FormErrorMessage name={name} />
    </div>
  )
}

const StyleButton = ({
  Icon,
  onClick,
  isActive,
  stroke = false,
}: {
  Icon: Icon
  onClick: () => void
  isActive?: boolean
  stroke?: boolean
}) => (
  <button
    onMouseDown={(e) => {
      e.preventDefault()
      onClick()
    }}
    type="button"
    className={`group grid h-5 w-5 place-items-center rounded ${
      isActive ? 'bg-halloween-orange' : 'hover:bg-halloween-orange'
    }`}
    tabIndex={-1}
  >
    <Icon
      className={
        isActive
          ? stroke
            ? 'stroke-white'
            : 'fill-white'
          : stroke
          ? 'stroke-onyx group-hover:stroke-white'
          : 'fill-onyx group-hover:fill-white'
      }
    />
  </button>
)

const compositeDecorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback, contentState) => {
      contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity()
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK'
      }, callback)
    },
    component: (props: DraftDecoratorComponentProps) => (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={props.contentState.getEntity(props.entityKey).getData().link}
        className="text-bleu-de-france underline"
      >
        {props.children}
      </a>
    ),
  },
])
