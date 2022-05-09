import { format } from 'date-fns'
import {
  CompositeDecorator,
  convertFromRaw,
  DraftDecoratorComponentProps,
  Editor,
  EditorState,
} from 'draft-js'
import Link from 'next/link'

const TicketEmailCard = ({ message, createdAt }: { message: string; createdAt: Date }) => (
  <div className="space-y-3 rounded-xl bg-white px-6 py-5 shadow">
    <div className="font-urbanist text-xs font-medium text-lavender-gray">
      {format(createdAt, "yy MMM''dd")}
    </div>
    <Editor
      onChange={() => {}}
      editorState={EditorState.createWithContent(
        convertFromRaw(JSON.parse(message)),
        new CompositeDecorator([
          {
            strategy: (contentBlock, callback, contentState) => {
              contentBlock.findEntityRanges((character) => {
                const entityKey = character.getEntity()
                return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK'
              }, callback)
            },
            component: (props: DraftDecoratorComponentProps) => (
              <Link href={props.contentState.getEntity(props.entityKey).getData().link}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bleu-de-france underline"
                >
                  {props.children}
                </a>
              </Link>
            ),
          },
        ])
      )}
      readOnly
    />
  </div>
)

export default TicketEmailCard
