import { useState } from 'react'
import { getReviewByID } from '../api.js'

export function ReviewCard({ review }) {
  const [reviewBody, setReviewBody] = useState('')
  const [toggleReviewButton, setToggleReviewButton] = useState('Show review')

  function clickReviewButton() {
    if (toggleReviewButton === 'Show review') {
      setToggleReviewButton('Hide review')
      setReviewBody('Loading...')
      return getReviewByID(review.review_id).then((data) => {
        setReviewBody(data.review.review_body)
      })
    } else if (toggleReviewButton === 'Hide review') {
      setToggleReviewButton('Show review')
      setReviewBody('')
    }
  }

  return (
    <article>
      <img src={review.review_img_url} alt={review.title} />
      <h3>{review.title}</h3>
      <b>{review.category}</b>
      <p>Created by {review.designer}</p>
      <h4>{review.owner}</h4>
      <p>Votes: {review.votes}</p>
      <button onClick={clickReviewButton}>{toggleReviewButton}</button>
      <p>{reviewBody}</p>
      <p>Comments: {review.comment_count}</p>
    </article>
  )
}
