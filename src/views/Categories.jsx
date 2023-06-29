import { useState, useEffect } from 'react'
import { getCategories } from '../api.js'
import { CategoryCard } from '../components/categories/CategoryCard.jsx'
import { ThreeDots } from 'react-loading-icons'

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
    return (
      <>
        <br></br>
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
