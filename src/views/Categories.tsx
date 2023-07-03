import { useState, useEffect } from 'react'
import { getCategories } from '../api.ts'
import { CategoryCard } from '../components/categories/CategoryCard.tsx'
import { ThreeDots } from 'react-loading-icons'

export interface CategoryI {
  slug?: string
  description?: string
}

export function Categories() {
  const [categories, setCategories] = useState<CategoryI[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data.categories)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <>
        <ThreeDots className='loading' fill='#23395d' width='50' />
      </>
    )
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
