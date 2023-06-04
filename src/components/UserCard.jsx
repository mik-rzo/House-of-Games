import { useContext } from 'react'
import { UserContext } from '../contexts/User.jsx'
import { Avatar } from './Avatar.jsx'
import { isLoggedOut } from '../utils/isLoggedOut.js'
import { Link } from 'react-router-dom'

export function UserCard({ user }) {
  const { userLogin, setUserLogin } = useContext(UserContext)

  function login() {
    setUserLogin(user)
  }

  return (
    <article className='user-card'>
      <h3>{user.username}</h3>
      <Avatar avatarUrl={user.avatar_url} />
      {isLoggedOut(userLogin) ? (
        <Link to='/' onClick={login}>
          Login
        </Link>
      ) : (
        <></>
      )}
    </article>
  )
}
