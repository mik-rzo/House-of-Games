import { Link } from 'react-router-dom'
import { Avatar } from './Avatar.jsx'

export function ReviewCard({ review }) {
  return (
    <Link to={`/reviews/${review.review_id}`}>
      <article className='review-card'>
        <img src={review.review_img_url} alt={review.title} />
        <h2>{review.title}</h2>
        <h3>{review.category}</h3>
        <p>Created by {review.designer}</p>
        <h4>{review.owner}</h4>
        <Avatar avatarUrl={review.avatar_url} />
        <p>{review.created_at}</p>
        <p>Votes: {review.votes}</p>
        <p>Comments: {review.comment_count}</p>
      </article>
    </Link>
  )
}
