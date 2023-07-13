import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { getReviewByID, getComments, getUserByUsername } from '../api.ts'
import { CommentForm } from '../components/single-review/CommentForm.tsx'
import { VoteButton } from '../components/common/VoteButton.tsx'
import { CommentCard } from '../components/single-review/CommentCard.tsx'
import { UserContext } from '../contexts/User.tsx'
import { formatDate } from '../utils/formatDate.ts'
import { isLoggedOut } from '../utils/isLoggedOut.ts'
import { Alert } from '../components/common/Alert.tsx'
import { Avatar } from '../components/common/Avatar.tsx'
import { ThreeDots } from 'react-loading-icons'

export interface SingleReviewI {
	review_id: number
	title: string
	owner: string
	category: string
	designer: string
	review_img_url: string
	review_body: string
	created_at: string
	votes: number
	comment_count: number
	avatar_url: string
}

export interface CommentI {
	comment_id: number
	username: string
	review_id: number
	votes: number
	created_at: string
	body: string
	avatar_url: string
}

export function SingleReview() {
	const { userLogin } = useContext(UserContext)

	const [isLoading, setIsLoading] = useState(true)

	const [review, setReview] = useState<SingleReviewI>({} as SingleReviewI)
	const [reviewVoteCount, setReviewVoteCount] = useState(0)
	const [avatarUrl, setAvatarUrl] = useState('')
	const [comments, setComments] = useState<CommentI[]>([])

	const [displayAlert, setDisplayAlert] = useState(false)

	const { review_id } = useParams()

	useEffect(() => {
		getReviewByID(review_id as string)
			.then((data) => {
				data.review.created_at = formatDate(data.review.created_at)
				return Promise.all([getUserByUsername(data.review.owner), data.review])
			})
			.then(([response, review]) => {
				setReview(review)
				setReviewVoteCount(review.votes)
				setAvatarUrl(response.user.avatar_url)
				return getComments(review_id as string)
			})
			.then((data) => {
				data.comments = data.comments.map(async (currComment: object) => {
					const comment: { [key: string]: any } = { ...currComment }
					comment.created_at = formatDate(comment.created_at)
					comment.avatar_url = await getUserByUsername(comment.author).then((data) => {
						return data.user.avatar_url
					})
					return comment
				})
				return Promise.all(data.comments)
			})
			.then((comments) => {
				setComments(comments)
				setIsLoading(false)
			})
	}, [])

	if (isLoading) {
		return (
			<>
				<ThreeDots className='loading' fill='#8e1a10' width='50' />
			</>
		)
	}

	return (
		<main id='single-review-page'>
			<img src={review.review_img_url} alt={review.title} />
			<h2>{review.title}</h2>
			<b>{review.category}</b>
			<p>Game created by {review.designer}</p>
			<div className='grid-user'>
				<h3 className='flex-center username'>{review.owner}</h3>
				<Avatar avatarUrl={avatarUrl} />
			</div>
			<i className='flex-center'>Posted on {review.created_at}</i>
			<article>
				<p>{review.review_body}</p>
			</article>
			<div className='grid-vote flex-right'>
				<p id='vote-count'>Votes: {reviewVoteCount}</p>
				<VoteButton
					id={review.review_id as number}
					type='review'
					setVoteCount={setReviewVoteCount}
					setDisplayAlert={setDisplayAlert}
				/>
			</div>
			{displayAlert && <Alert severity='error' crud='Vote' setDisplayAlert={setDisplayAlert} />}
			{isLoggedOut(userLogin) ? (
				<p>
					<br></br>
					<b>Login to post a comment</b>
				</p>
			) : (
				<CommentForm setComments={setComments} reviewID={review.review_id as number} setReview={setReview} />
			)}
			<p>Comments: {review.comment_count}</p>
			<ul id='single-review-page'>
				{comments.map((comment: CommentI) => {
					return (
						<li key={comment.comment_id} className='comment-card'>
							<CommentCard comment={comment} />
						</li>
					)
				})}
			</ul>
		</main>
	)
}
