import { useState, useEffect } from 'react'
import { getUsers } from '../api.js'
import { UserCard } from './UserCard.jsx'
import { ThreeDots } from 'react-loading-icons'

export function Login() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getUsers().then((data) => {
      setUsers(data.users)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <>
        <br></br>
        <ThreeDots className='loading' fill='#cba324' width='50' />
      </>
    )
  }

  return (
    <main id='login-page'>
      <ul id='login-page'>
        {users.map((user) => {
          return (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          )
        })}
      </ul>
    </main>
  )
}
