import { Editor, EditorCommand, EditorState, RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { useFormikContext } from 'formik'
import { KeyboardEvent, SyntheticEvent, useEffect, useState } from 'react'
import { Icon } from '../../types/Icon.type'
import FormErrorMessage from './FormErrorMessage'
import BoldIcon from './icons/BoldIcon'
import ItalicIcon from './icons/ItalicIcon'
import StrikethroughIcon from './icons/StrikethroughIcon'
import TextCenterAlignmentIcon from './icons/TextCenterAlignmentIcon'
import TextLeftAlignmentIcon from './icons/TextLeftAlignmentIcon'
import TextRightAlignmentIcon from './icons/TextRightAlignmentIcon'
import UnderlineIcon from './icons/UnderlineIcon'
import UnorderedListIcon from './icons/UnorderedListIcon'

const RichTextInput = ({
  name,
  Icon,
  placeholder,
  className,
  readOnly = false,
  label,
}: {
  name: string
  Icon: Icon
  placeholder: string
  className?: string
  readOnly?: boolean
  label?: string
}) => {
  const { handleBlur } = useFormikContext()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [isEditorFocused, setEditorFocused] = useState(false)
  const [textAlignment, setTextAlignment] = useState<'left' | 'center' | 'right'>('left')
  const [isPlaceholderVisible, setPlaceHolderVisible] = useState(true)

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState)
  }
  const handleKeyCommand = (command: EditorCommand, editorState: EditorState) => {
    const newEditorState = RichUtils.handleKeyCommand(editorState, command)

    if (newEditorState) {
      onChange(newEditorState)
      return 'handled'
    }

    return 'not-handled'
  }
  const onTab = (e: KeyboardEvent) => onChange(RichUtils.onTab(e, editorState, 4))
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
  const textLeftAlignmentOnClick = () => setTextAlignment('left')
  const textCenterAlignmentOnClick = () => setTextAlignment('center')
  const textRightAlignmentOnClick = () => setTextAlignment('right')
  const unorderedListOnClick = () =>
    setEditorState(RichUtils.toggleBlockType(editorState, 'unordered-list-item'))

  useEffect(() => {
    const currentContent = editorState.getCurrentContent()
    setPlaceHolderVisible(
      currentContent.hasText() || currentContent.getBlockMap().first().getType() === 'unstyled'
    )
  }, [editorState])

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-2 inline-block font-urbanist text-xs font-medium text-metallic-silver empty:hidden"
      >
        {label}
      </label>
      <div
        className={`overflow-hidden rounded-xl ${
          isEditorFocused ? 'ring-2 ring-jungle-green ring-opacity-40' : 'ring-1 ring-bright-gray '
        }`}
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
          <StyleButton
            Icon={TextLeftAlignmentIcon}
            onClick={textLeftAlignmentOnClick}
            isActive={textAlignment === 'left'}
            stroke
          />
          <StyleButton
            Icon={TextCenterAlignmentIcon}
            onClick={textCenterAlignmentOnClick}
            isActive={textAlignment === 'center'}
            stroke
          />
          <StyleButton
            Icon={TextRightAlignmentIcon}
            onClick={textRightAlignmentOnClick}
            isActive={textAlignment === 'right'}
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
          placeholder={isPlaceholderVisible ? placeholder : undefined}
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={readOnly}
          spellCheck={false}
          textAlignment={textAlignment}
          onTab={onTab}
        />
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
      isActive ? 'bg-jungle-green' : 'hover:bg-jungle-green'
    }`}
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

export default RichTextInput
