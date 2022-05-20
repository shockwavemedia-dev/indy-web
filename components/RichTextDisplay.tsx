import {
  CompositeDecorator,
  convertFromRaw,
  DraftDecoratorComponentProps,
  Editor,
  EditorState,
} from 'draft-js'
import 'draft-js/dist/Draft.css'

export const RichTextDisplay = ({ value, className }: { value: string; className?: string }) => {
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
