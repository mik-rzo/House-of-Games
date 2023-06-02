import { useState } from 'react'
import { VoteButton } from './VoteButton.jsx'
import { Alert } from './Alert.jsx'
import { Avatar } from './Avatar.jsx'

export function CommentCard({ comment }) {
  const [commentVoteCount, setCommentVoteCount] = useState(comment.votes)
  const [displayAlert, setDisplayAlert] = useState(false) 
  return (
    <article>
      <h4>{comment.author}</h4>
      <p>{comment.created_at}</p>
      <p>{comment.body}</p>
      <Avatar avatarUrl={comment.avatar_url} />
      <p>Votes: {commentVoteCount}</p>
      <VoteButton id={comment.review_id} type='comment' setVoteCount={setCommentVoteCount} setDisplayAlert={setDisplayAlert} />
      {displayAlert && <Alert crud='Vote' setDisplayAlert={setDisplayAlert} />}
    </article>
  )
}
