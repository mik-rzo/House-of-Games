import { useState, useEffect } from 'react'
import { getReviews, getUserByUsername } from '../api.ts'
import { ReviewCard } from '../components/home/ReviewCard.tsx'
import { formatDate } from '../utils/formatDate.ts'
import { useSearchParams } from 'react-router-dom'
import { SortByMenu } from '../components/home/SortByMenu.tsx'
import { ThreeDots } from 'react-loading-icons'

import './Home.css'

interface ReviewI {
	review_id: number
	title: string
	owner: string
	category: string
	designer: string
	review_img_url: string
	created_at: string
	votes: number
	comment_count: number
	avatar_url: string
}

export function Home() {
	const [reviews, setReviews] = useState<ReviewI[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const [searchParams] = useSearchParams()
	const categoryQuery = searchParams.get('category')
	const sortByQuery = searchParams.get('sort_by')
	const orderQuery = searchParams.get('order')

	useEffect(() => {
		getReviews(categoryQuery, sortByQuery, orderQuery)
			.then((data) => {
				data.reviews = data.reviews.map(async (currReview: object) => {
					const review: { [key: string]: any } = { ...currReview }
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
				<ThreeDots className='loading' fill='#b01355' width='50' />
			</>
		)
	}

	return (
		<main id='home-page'>
			<SortByMenu categoryQuery={categoryQuery} />
			<ul id='review-cards'>
				{reviews.map((review: ReviewI) => {
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
