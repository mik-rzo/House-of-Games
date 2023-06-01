import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/User.jsx'
import { isLoggedOut } from '../utils/isLoggedOut.js'
import { Avatar } from './Avatar.jsx'

export function NavBar() {
  const { userLogin, setUserLogin } = useContext(UserContext)
  return (
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/categories'>Categories</Link>
      </li>
      {isLoggedOut(userLogin) ? (
        <li>
          <Link to='/login'>Login</Link>
        </li>
      ) : (
        <li>
          <b>{userLogin.username}</b>
          <button onClick={() => setUserLogin({})}>Logout</button>
        </li>
      )}
    </ul>
  )
}
