import { useEffect, useState } from 'react'

const CommentParagraph = ({ comment }: { comment: string }) => {
  const [displayComment, setdisplayComment] = useState('')

  useEffect(() => {
    if (comment !== '') {
      let regex = /@\[.+?\]\(.+?\)/gm
      let displayRegex = /@\[.+?\]/g
      let idRegex = /\(.+?\)/g
      let matches = comment.match(regex)
      let arr: {
        id: string
        display: string
      }[] = []
      matches &&
        matches.forEach((m) => {
          // @ts-ignore: Object is possibly 'null'.
          let id = m.match(idRegex)[0].replace('(', '').replace(')', '')
          // @ts-ignore: Object is possibly 'null'.
          let display = m.match(displayRegex)[0].replace('@[', '').replace(']', '')

          arr.push({ id: id, display: display })
          console.log(display)
        })
      let newComment = comment.split(regex)
      let output = ''
      for (let i = 0; i < newComment.length; i++) {
        const c = newComment[i]
        if (i === newComment.length - 1) output += c
        else
          output +=
            c +
            `<a style="border: 1px solid #000080; border-radius: 0.5rem; font-weight: 500; padding-left: 0.625rem; padding-right: 0.625rem; background-color: #ccccff; font-size: 0.875rem;
            line-height: 1.25rem;">${arr[i].display}</a>`
      }
      setdisplayComment(output)
    }
  }, [comment])

  return (
    <div>
      <p
        className="d-inline comment-paragraph-text"
        dangerouslySetInnerHTML={{
          __html: displayComment,
        }}
      />
    </div>
  )
}
export default CommentParagraph
