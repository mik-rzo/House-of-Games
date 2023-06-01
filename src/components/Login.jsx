import { useState, useEffect } from 'react'
import { getUsers } from '../api.js'
import { UserCard } from './UserCard.jsx'

export function Login() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data.users)
    })
  }, [])

  return (
    <main>
      <h2>Login page</h2>
      <ul>
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
