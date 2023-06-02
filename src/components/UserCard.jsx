import { useContext } from 'react'
import { UserContext } from '../contexts/User.jsx'
import { Avatar } from './Avatar.jsx'
import { isLoggedOut } from '../utils/isLoggedOut.js'

export function UserCard({ user }) {
  const { userLogin, setUserLogin } = useContext(UserContext)
  return (
    <article>
      <h3>{user.username}</h3>
      <Avatar avatarUrl={user.avatar_url} />
      {isLoggedOut(userLogin) ? <button onClick={() => setUserLogin(user)}>Login</button> : <></>}
    </article>
  )
}
