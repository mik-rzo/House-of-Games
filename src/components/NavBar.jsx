import { Link } from 'react-router-dom'

export function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/' id='home'>Home</Link>
        </li>
        <li>
          <Link to='/categories' id='categories'>Categories</Link>
        </li>
        <li>
          <Link to='/login' id='login'>Login</Link>
        </li>
      </ul>
    </nav>
  )
}
