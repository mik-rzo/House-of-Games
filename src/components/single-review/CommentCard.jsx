import { useState } from 'react'
import { VoteButton } from '../common/VoteButton.jsx'
import { Alert } from '../common/Alert.jsx'
import { Avatar } from '../common/Avatar.jsx'

export function CommentCard({ comment }) {
  const [commentVoteCount, setCommentVoteCount] = useState(comment.votes)
  const [displayAlert, setDisplayAlert] = useState(false)
  return (
    <article className='comment-card'>
      <div className='grid-user'>
        <h4 className='username'>{comment.author}</h4>
        <Avatar avatarUrl={comment.avatar_url} />
      </div>
      <p>{comment.created_at}</p>
      <p>{comment.body}</p>
      <div className='grid-vote'>
        <p id='vote-count'>Votes: {commentVoteCount}</p>
        <VoteButton
          id={comment.review_id}
          type='comment'
          setVoteCount={setCommentVoteCount}
          setDisplayAlert={setDisplayAlert}
        />
      </div>
      {displayAlert && <Alert severity='error' crud='Vote' setDisplayAlert={setDisplayAlert} />}
    </article>
  )
}
