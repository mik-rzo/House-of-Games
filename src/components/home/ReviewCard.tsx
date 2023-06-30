import { Link } from 'react-router-dom'
import { Avatar } from '../common/Avatar.tsx'

interface ReviewCardProps {
	review: {
		review_id?: number
		title?: string
		owner?: string
		category?: string
		designer?: string
		review_img_url?: string
		created_at?: string
		votes?: number
		comment_count?: number
		avatar_url?: string
	}
}

export function ReviewCard({ review }: ReviewCardProps) {
	return (
		<Link to={`/reviews/${review.review_id}`}>
			<article className='review-card'>
				<img src={review.review_img_url} alt={review.title} />
				<h2>{review.title}</h2>
				<h3>{review.category}</h3>
				<p>Game created by {review.designer}</p>
				<div className='grid-user'>
					<h4 className='username'>{review.owner}</h4>
					<Avatar avatarUrl={review.avatar_url || ''} />
				</div>
				<p>{review.created_at}</p>
				<p>Votes: {review.votes}</p>
				<p>Comments: {review.comment_count}</p>
			</article>
		</Link>
	)
}
