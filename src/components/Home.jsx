import { useState, useEffect } from 'react'
import { getReviews, getUserByUsername } from '../api.js'
import { ReviewCard } from './ReviewCard.jsx'
import { formatDate } from '../utils/formatDate.js'
import { useSearchParams } from 'react-router-dom'
import { SortByMenu } from './SortByMenu.jsx'

export function Home() {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const categoryQuery = searchParams.get('category')
  const sortByQuery = searchParams.get('sort_by')
  const orderQuery = searchParams.get('order')

  useEffect(() => {
    setIsLoading(true)
    getReviews(categoryQuery, sortByQuery, orderQuery)
      .then((data) => {
        data.reviews = data.reviews.map(async (currReview) => {
          const review = { ...currReview }
          review.created_at = formatDate(review.created_at)
          review.avatar_url = await getUserByUsername(review.owner).then((data) => {
            return data.user.avatar_url
          })
          return review
        })
        return Promise.all(data.reviews)
      })
      .then((reviews) => {
        setReviews(reviews)
        setIsLoading(false)
      })
  }, [searchParams])

  if (isLoading) {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }

  return (
    <main>
      <SortByMenu categoryQuery={categoryQuery} />
      <ul id='home-page'>
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
