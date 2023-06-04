import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function SortByMenu({ categoryQuery }) {
  const navigate = useNavigate()
  const [displayMenu, setDisplayMenu] = useState(false)

  const [sortByQuery, setSortByQuery] = useState('created_at')
  const [orderQuery, setOrder] = useState('desc')

  function handleSubmit(event) {
    event.preventDefault()
    if (!categoryQuery) {
      return navigate(`/?sort_by=${sortByQuery}&order=${orderQuery}`)
    } else {
      return navigate(`/?category=${categoryQuery}&sort_by=${sortByQuery}&order=${orderQuery}`)
    }
  }
  return (
    <aside id='sort-menu'>
      <button onClick={() => setDisplayMenu(!displayMenu)} id='sort-by-reviews'>
        <svg
          className={displayMenu ? 'sort-menu-active' : 'sort-menu-inactive'}
          fill='#000000'
          width='50px'
          height='50px'
          viewBox='-6.5 0 32 32'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'>
          <title>dropdown</title>
          <path d='M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z'></path>
        </svg>
      </button>
      {displayMenu && (
        <form id='sort-options' onSubmit={handleSubmit}>
          <label htmlFor='sort-by'></label>
          <select value={sortByQuery} onChange={(e) => setSortByQuery(e.target.value)} name='sort-by' id='sort-by'>
            <option value='created_at'>Date</option>
            <option value='comment_count'>Comment count</option>
            <option value='votes'>Votes</option>
          </select>
          <br></br>
          <label htmlFor='descending' id='descending'>Descending</label>
          <input
            checked={orderQuery === 'desc'}
            onChange={(e) => setOrder(e.target.value)}
            type='radio'
            name='order'
            value='desc'
            id='descending'></input>
          <br></br>
          <label htmlFor='ascending' id='ascending'>Ascending</label>
          <input
            checked={orderQuery === 'asc'}
            onChange={(e) => setOrder(e.target.value)}
            type='radio'
            name='order'
            value='asc'
            id='ascending'></input>
          <br></br>
          <button type='submit'>Sort reviews</button>
        </form>
      )}
    </aside>
  )
}
