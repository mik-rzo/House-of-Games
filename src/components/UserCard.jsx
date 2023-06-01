import { useContext } from 'react'
import { UserContext } from '../contexts/User.jsx'
import { Avatar } from './Avatar.jsx'

export function UserCard({ user }) {
  const { setUserLogin } = useContext(UserContext)
  return (
    <article>
      <h3>{user.username}</h3>
      <Avatar avatarUrl={user.avatar_url} />
      <button onClick={() => setUserLogin(user)}>Login</button>
    </article>
  )
}
