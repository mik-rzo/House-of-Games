import { useContext } from 'react'
import { UserContext } from '../contexts/User.jsx'
import { Avatar } from './Avatar.jsx'

export function UserCard({ user }) {
  const { userLogin, setUserLogin } = useContext(UserContext)
  console.log(userLogin)
  return (
    <article>
      <h3>{user.username}</h3>
      <Avatar username={user.username} />
      <button onClick={() => setUserLogin(user)}>Login</button>
    </article>
  )
}
