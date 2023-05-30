export function ReviewCard({ review }) {
  return (
    <article>
      <img src={review.review_img_url} alt={review.title}/>
      <h3>{review.title}</h3>
      <b>{review.category}</b>
      <p>Created by {review.designer}</p>
      <h4>{review.owner}</h4>
      <p>Votes: {review.votes}</p>
      <button>Show review</button>
      <p>Comments: {review.comment_count}</p>
    </article>
  )
}
