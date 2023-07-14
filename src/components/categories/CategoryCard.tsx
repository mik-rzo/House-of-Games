import { Link } from 'react-router-dom'
import { CategoryI } from '../../views/Categories.tsx'

import './CategoryCard.css'

interface CategoryCardProps {
	category: CategoryI
}

export function CategoryCard({ category }: CategoryCardProps) {
	return (
		<Link to={`/?category=${category.slug}`}>
			<article>
				<h3>{category.slug}</h3>
				<p>{category.description}</p>
			</article>
		</Link>
	)
}
