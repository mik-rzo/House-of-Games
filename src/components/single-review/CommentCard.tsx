import { useState } from 'react'
import { VoteButton } from '../common/VoteButton.tsx'
import { Alert } from '../common/Alert.tsx'
import { Avatar } from '../common/Avatar.tsx'
import { CommentI } from '../../views/SingleReview.tsx'

interface CommentCardProps {
	comment: CommentI
}

export function CommentCard({ comment }: CommentCardProps) {
	const [commentVoteCount, setCommentVoteCount] = useState(comment.votes)
	const [displayAlert, setDisplayAlert] = useState(false)
	return (
		<article className='comment-card'>
			<div className='grid-user'>
				<h4 className='username'>{comment.author}</h4>
				<Avatar avatarUrl={comment.avatar_url as string} />
			</div>
			<p>{comment.created_at}</p>
			<p>{comment.body}</p>
			<div className='grid-vote'>
				<p id='vote-count'>Votes: {commentVoteCount}</p>
				<VoteButton
					id={comment.review_id as number}
					type='comment'
					setVoteCount={setCommentVoteCount as React.Dispatch<React.SetStateAction<number>>}
					setDisplayAlert={setDisplayAlert}
				/>
			</div>
			{displayAlert && <Alert severity='error' crud='Vote' setDisplayAlert={setDisplayAlert} />}
		</article>
	)
}
