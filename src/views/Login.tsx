import { useState, useEffect } from 'react'
import { getUsers } from '../api.js'
import { UserCard } from '../components/login/UserCard.js'
import { ThreeDots } from 'react-loading-icons'

import './Login.css'

export interface UserI {
  username: string
  avatar_url: string
  name: string
}

export function Login() {
  const [users, setUsers] = useState<UserI[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data.users)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <>
        <ThreeDots className='loading' fill='#cba324' width='50' />
      </>
    )
  }

  return (
    <main id='login-page'>
      <ul id='user-cards'>
        {users.map((user) => {
          return (
            <li key={user.username} className='user-card'>
              <UserCard user={user} />
            </li>
          )
        })}
      </ul>
    </main>
  )
}
