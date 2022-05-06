import { format } from 'date-fns';
import { CompositeDecorator, convertFromRaw, DraftDecoratorComponentProps, Editor, EditorState } from 'draft-js';
import Image from 'next/image';
import Link from 'next/link';
import DummyAvatar from '../public/images/dummy-avatar.png';

const NoteCard = ({
  note,
  createdBy,
  createdAt,
}: {
  note: string
  createdBy: string
  createdAt: Date
}) => (
  <div className="rounded-xl bg-white px-6 py-5 shadow">
  <div className="flex items-center mb-3">
    <Image src={DummyAvatar} alt="Dummy" height={32} width={32} className="rounded-full" />
    <div className="ml-3 font-urbanist text-sm font-semibold text-onyx">{createdBy}</div>
    <div className="mx-2 h-1 w-1 rounded bg-bright-gray" />
    <div className="font-urbanist text-xs font-medium text-lavender-gray">
      {format(createdAt, "yy MM''dd")}
    </div>
  </div>
  <div className="whitespace-normal">
    <Editor
      onChange={() => {}}
      editorState={EditorState.createWithContent(
        convertFromRaw(JSON.parse(note)),
        new CompositeDecorator([
          {
            strategy: (contentBlock, callback, contentState) => {
              contentBlock.findEntityRanges((character) => {
                const entityKey = character.getEntity()
                return (
                  entityKey !== null &&
                  contentState.getEntity(entityKey).getType() === 'LINK'
                )
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
  </div>
)

export default NoteCard
