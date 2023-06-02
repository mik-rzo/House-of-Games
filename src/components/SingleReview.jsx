import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { getReviewByID, getComments, getUserByUsername } from '../api.js'
import { CommentForm } from './CommentForm.jsx'
import { VoteButton } from './VoteButton.jsx'
import { CommentCard } from './CommentCard.jsx'
import { UserContext } from '../contexts/User.jsx'
import { formatDate } from '../utils/formatDate.js'
import { isLoggedOut } from '../utils/isLoggedOut.js'
import { Alert } from './Alert.jsx'
import { Avatar } from './Avatar.jsx'

export function SingleReview() {
  const { userLogin } = useContext(UserContext)

  const [review, setReview] = useState({})
  const [reviewVoteCount, setReviewVoteCount] = useState(0)
  const [reviewIsLoading, setReviewIsLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [comments, setComments] = useState([])
  const [commentsIsLoading, setCommentsIsLoading] = useState(false)

  const [displayAlert, setDisplayAlert] = useState(false)

  const { review_id } = useParams()

  useEffect(() => {
    setReviewIsLoading(true)
    setCommentsIsLoading(true)

    getReviewByID(review_id)
      .then((data) => {
        data.review.created_at = formatDate(data.review.created_at)
        return Promise.all([getUserByUsername(data.review.owner), data.review])
      })
      .then(([response, review]) => {
        setReview(review)
        setReviewVoteCount(review.votes)
        setAvatarUrl(response.user.avatar_url)
        setReviewIsLoading(false)
      })

    getComments(review_id)
      .then((data) => {
        data.comments = data.comments.map(async (currComment) => {
          const comment = { ...currComment }
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
        setCommentsIsLoading(false)
      })
  }, [])

  if (reviewIsLoading) {
    return <p>Loading...</p>
  }

  return (
    <main id='single-review-page'>
      <img src={review.review_img_url} alt={review.title} />
      <h2>{review.title}</h2>
      <b>{review.category}</b>
      <p>Created by {review.designer}</p>
      <h3>{review.owner}</h3>
      <Avatar avatarUrl={avatarUrl} />
      <p>{review.created_at}</p>
      <article>
        <p>{review.review_body}</p>
      </article>
      <p>Votes: {reviewVoteCount}</p>
      <VoteButton
        id={review.review_id}
        type='review'
        setVoteCount={setReviewVoteCount}
        setDisplayAlert={setDisplayAlert}
      />
      {displayAlert && <Alert severity='error' crud='Vote' setDisplayAlert={setDisplayAlert} />}
      {isLoggedOut(userLogin) ? (
        <p><b>Login to post a comment</b></p>
      ) : (
        <CommentForm setComments={setComments} reviewID={review.review_id} setReview={setReview} />
      )}
      <p>Comments: {review.comment_count}</p>
      <>
        {commentsIsLoading ? (
          <p>'Loading...'</p>
        ) : (
          <ul>
            {comments.map((comment) => {
              return (
                <li key={comment.comment_id} className='comment-card'>
                  <CommentCard comment={comment} />
                </li>
              )
            })}
          </ul>
        )}
      </>
    </main>
  )
}
