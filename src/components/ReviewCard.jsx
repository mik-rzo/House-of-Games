import { Link } from 'react-router-dom'
import { Avatar } from './Avatar.jsx'

export function ReviewCard({ review }) {
  return (
    <Link to={`/reviews/${review.review_id}`}>
      <article>
        <img src={review.review_img_url} alt={review.title}  />
        <h3>{review.title}</h3>
        <b>{review.category}</b>
        <p>Created by {review.designer}</p>
        <h4>{review.owner}</h4>
        <Avatar username={review.owner} />
      <p>Votes: {review.votes}</p>
        <p>Comments: {review.comment_count}</p>
      </article>
    </Link>
  )
}
