import { useState, useEffect } from 'react'
import { getReviews } from '../api.js'
import { ReviewCard } from './ReviewCard.jsx'

export function Home() {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getReviews().then((data) => {
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
      <h2>Home page</h2>
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
