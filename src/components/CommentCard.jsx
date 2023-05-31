export function CommentCard({ comment }) {
  return (
    <article>
      <h4>{comment.author}</h4>
      <p>{comment.body}</p>
      <p>Votes: {comment.votes}</p>
    </article>
  )
}

//           "body": "Now this is a story all about how, board games turned my life upside down",
//           "author": "mallionaire",
//           "votes": 13,
//           "created_at": "2021-01-18T10:24:05.410Z"
