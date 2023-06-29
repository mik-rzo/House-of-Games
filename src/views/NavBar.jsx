import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/User.jsx'
import { isLoggedOut } from '../utils/isLoggedOut.js'
import { Avatar } from '../components/common/Avatar.jsx'

export function NavBar() {
  const { userLogin, setUserLogin } = useContext(UserContext)

  function logout() {
    setUserLogin({})
  }

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
          <li id='nav-profile'>
            <b>{userLogin.username}</b>
            <Avatar avatarUrl={userLogin.avatar_url} />
            <Link to='/' onClick={logout}>Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
