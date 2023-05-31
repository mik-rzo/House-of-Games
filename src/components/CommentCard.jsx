export function CommentCard({ comment }) {
  return (
    <article>
      <h4>{comment.author}</h4>
      <p>{comment.body}</p>
      <p>Votes: {comment.votes}</p>
    </article>
  )
}
