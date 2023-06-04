import { useState, useEffect } from 'react'
import { getCategories } from '../api.js'
import { CategoryCard } from './CategoryCard.jsx'

export function Categories() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getCategories().then((data) => {
      setCategories(data.categories)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <p>Loading</p>
  }

  return (
    <main id='categories-page'>
      <ul id='categories-page'>
        {categories.map((category) => {
          return (
            <li className='category-card' key={category.slug}>
              <CategoryCard category={category} />
            </li>
          )
        })}
      </ul>
    </main>
  )
}
