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
        })
      let newComment = comment.split(regex)
      let output = ''
      for (let i = 0; i < newComment.length; i++) {
        const c = newComment[i]
        if (i === newComment.length - 1) output += c
        else
          output +=
          `<a style="font-color: #32343D; font: 500 0.875rem/1.25rem Urbanist;">${c}</a>` +
            `<a style="background-color: #ccccff; font-color: #32343D; font: 500 0.875rem/1.25rem Urbanist;">${arr[i].display}</a>`
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
