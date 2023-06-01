import { useState, useEffect } from 'react'
import { getReviews } from '../api.js'
import { ReviewCard } from './ReviewCard.jsx'
import { formatDate } from '../utils/formatDate.js'

export function Home() {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getReviews().then((data) => {
      data.reviews = data.reviews.map((currReview) => {
        const review = { ...currReview }
        review.created_at = formatDate(review.created_at)
        return review
      })
      setReviews(data.reviews)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }

  return (
    <main>
      <ul>
        {reviews.map((review) => {
          return (
            <li key={review.review_id} className='review-card'>
              <ReviewCard review={review} />
            </li>
          )
        })}
      </ul>
    </main>
  )
}
