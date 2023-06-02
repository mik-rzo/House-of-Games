import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getReviewByID, getComments } from '../api.js'
import { VoteButton } from './VoteButton.jsx'
import { CommentCard } from './CommentCard.jsx'
import { formatDate } from '../utils/formatDate.js'
import { Alert } from './Alert.jsx'

export function SingleReview() {
  const [review, setReview] = useState({})
  const [reviewIsLoading, setReviewIsLoading] = useState(false)
  const [comments, setComments] = useState([])
  const [commentsIsLoading, setCommentsIsLoading] = useState(false)

  const [displayAlert, setDisplayAlert] = useState(false)

  const { review_id } = useParams()

  useEffect(() => {
    setReviewIsLoading(true)
    setCommentsIsLoading(true)

    getReviewByID(review_id).then((data) => {
      data.review.created_at = formatDate(data.review.created_at)
      setReview(data.review)
      setReviewIsLoading(false)
    })

    getComments(review_id).then((data) => {
      data.comments = data.comments.map((currComment) => {
        const comment = { ...currComment }
        comment.created_at = formatDate(comment.created_at)
        return comment
      })
      setComments(data.comments)
      setCommentsIsLoading(false)
    })
  }, [])

  if (reviewIsLoading) {
    return <p>Loading...</p>
  }

  return (
    <main id='single-review-page'>
      <img id='single-review-img' src={review.review_img_url} alt={review.title} />
      <div id='single-review-wrapper'>
        <h2>{review.title}</h2>
        <b>{review.category}</b>
        <p>Created by {review.designer}</p>
        <h3>{review.owner}</h3>
        <p>{review.created_at}</p>
        <article>
          <p>{review.review_body}</p>
        </article>
        <p>Votes: {review.votes}</p>
        <VoteButton reviewID={review.review_id} setReview={setReview} setDisplayAlert={setDisplayAlert} />
        {displayAlert && <Alert crud='Vote' setDisplayAlert={setDisplayAlert} />}
        <p>Comments: {review.comment_count}</p>
        <>
          {commentsIsLoading ? (
            <p>'Loading...'</p>
          ) : (
            <ul>
              {comments.map((comment) => {
                return (
                  <li key={comment.comment_id}>
                    <CommentCard comment={comment} />
                  </li>
                )
              })}
            </ul>
          )}
        </>
      </div>
    </main>
  )
}
