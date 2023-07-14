import { useState, useContext, FormEvent } from 'react'
import { UserContext } from '../../contexts/User.tsx'
import { Alert } from '../common/Alert.tsx'
import { getUserByUsername, postComment } from '../../api.ts'
import { formatDate } from '../../utils/formatDate.ts'
import { CommentI } from '../../views/SingleReview.tsx'
import { SingleReviewI } from '../../views/SingleReview.tsx'

import './CommentForm.css'

interface CommentFormProps {
	setComments: React.Dispatch<React.SetStateAction<CommentI[]>>
	reviewID: number
	setReview: React.Dispatch<React.SetStateAction<SingleReviewI>>
}

interface UserResponseI {
	user: {
		username: string
		name: string
		avatar_url: string
	}
}

export function CommentForm({ setComments, reviewID, setReview }: CommentFormProps) {
	const { userLogin } = useContext(UserContext)
	const [newComment, setNewComment] = useState('')
	const [displaySuccessAlert, setDisplaySuccessAlert] = useState(false)
	const [displayFailureAlert, setDisplayFailureAlert] = useState(false)

	function handleSubmit(event: FormEvent) {
		event.preventDefault()
		const comment = {
			username: userLogin.username || '',
			body: newComment
		}
		setNewComment('')
		postComment(reviewID.toString(), comment)
			.then((apiResponse) => {
				return Promise.all([getUserByUsername(userLogin.username as string), apiResponse.data.comment])
			})
			.then(([response, comment]: [UserResponseI, CommentI]) => {
				comment.created_at = formatDate(comment.created_at)
				comment.avatar_url = response.user.avatar_url
				setComments((comments) => [comment, ...comments])
				setReview((currReview) => {
					const review: SingleReviewI = { ...currReview }
					review.comment_count += 1
					return review
				})
				setDisplaySuccessAlert(true)
			})
			.catch(() => {
				setDisplayFailureAlert(true)
			})
	}

	return (
		<>
			<form className='comment-form' onSubmit={handleSubmit}>
				<label htmlFor='comment-form'></label>
				<textarea
					value={newComment}
					onChange={(event) => setNewComment(event.target.value)}
					id='comment-form'></textarea>
				<br></br>
				<button type='submit'>Post comment</button>
			</form>
			<span>
				{displaySuccessAlert ? (
					<Alert severity='success' crud='Post' setDisplayAlert={setDisplaySuccessAlert} />
				) : displayFailureAlert ? (
					<Alert severity='error' crud='Post' setDisplayAlert={setDisplayFailureAlert} />
				) : (
					<></>
				)}
			</span>
		</>
	)
}
