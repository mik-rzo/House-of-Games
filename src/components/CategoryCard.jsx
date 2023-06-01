import { Link } from 'react-router-dom'

export function CategoryCard({ category }) {
  return (
    <Link to={`/?category=${category.slug}`}>
      <article>
        <h3>{category.slug}</h3>
        <p>{category.description}</p>
      </article>
    </Link>
  )
}
