import { Avatar } from './Avatar.jsx'

export function CommentCard({ comment }) {
  return (
    <article>
      <h4>{comment.author}</h4>
      <p>{comment.created_at}</p>
      <p>{comment.body}</p>
      <Avatar avatarUrl={comment.avatar_url} />
      <p>Votes: {comment.votes}</p>
    </article>
  )
}
