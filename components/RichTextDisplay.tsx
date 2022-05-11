import {
  CompositeDecorator,
  convertFromRaw,
  DraftDecoratorComponentProps,
  Editor,
  EditorState,
} from 'draft-js'
import 'draft-js/dist/Draft.css'
import Link from 'next/link'

const RichTextDisplay = ({ value, className }: { value: string; className?: string }) => {
  return (
    <div className={className}>
      <Editor
        editorState={EditorState.createWithContent(
          convertFromRaw(JSON.parse(value)),
          compositeDecorator
        )}
        onChange={() => {}}
        readOnly
      />
    </div>
  )
}

const compositeDecorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback, contentState) => {
      contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity()
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK'
      }, callback)
    },
    component: (props: DraftDecoratorComponentProps) => (
      <Link href={props.contentState.getEntity(props.entityKey).getData().link}>
        <a target="_blank" rel="noopener noreferrer" className="text-bleu-de-france underline">
          {props.children}
        </a>
      </Link>
    ),
  },
])

export default RichTextDisplay
