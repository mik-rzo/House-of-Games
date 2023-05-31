import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getReviewByID } from '../api.js'

export function SingleReview() {
  const [review, setReview] = useState({})
  const [reviewIsLoading, setReviewIsLoading] = useState(false)

  const { review_id } = useParams()

  useEffect(() => {
    setReviewIsLoading(true)
    getReviewByID(review_id).then((data) => {
      setReview(data.review)
      setReviewIsLoading(false)
    })
  }, [])

  if (reviewIsLoading) {
    return <p>Loading...</p>
  }

  return (
    <main>
      <img src={review.review_img_url} alt={review.title} />
      <h3>{review.title}</h3>
      <b>{review.category}</b>
      <p>Created by {review.designer}</p>
      <h4>{review.owner}</h4>
      <article>
        <p>{review.review_body}</p>
      </article>
      <p>Votes: {review.votes}</p>
      <p>Comments: {review.comment_count}</p>
    </main>
  )
}
