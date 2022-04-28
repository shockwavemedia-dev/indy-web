import 'draft-js'

declare module 'draft-js' {
  export type DraftDecoratorComponentProps = {
    blockKey: BlockNodeKey
    children?: Array<React.MixedElement>
    contentState: ContentState
    decoratedText: string
    dir: ?HTMLDir
    end: number
    entityKey: ?string
    offsetKey: string
    start: number
  }
}
