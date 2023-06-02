import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/User.jsx'
import { isLoggedOut } from '../utils/isLoggedOut.js'
import { Avatar } from './Avatar.jsx'

export function NavBar() {
  const { userLogin, setUserLogin } = useContext(UserContext)
  return (
    <nav>
      <ul>
        <li>
          <Link id='home' to='/'>
            Home
          </Link>
        </li>
        <li>
          <Link id='categories' to='/categories'>
            Categories
          </Link>
        </li>
        {isLoggedOut(userLogin) ? (
          <li>
            <Link id='login' to='/login'>
              Login
            </Link>
          </li>
        ) : (
          <li>
            <b>{userLogin.username}</b>
            <Avatar avatarUrl={userLogin.avatar_url} />
            <button onClick={() => setUserLogin({})}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  )
}
