import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../contexts/User.tsx'
import { isLoggedOut } from '../../utils/isLoggedOut.ts'
import { Avatar } from '../common/Avatar.tsx'

export function NavBar() {
	const { userLogin, setUserLogin } = useContext(UserContext)

	function logout() {
		if (setUserLogin) {
			setUserLogin({})
		}
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
						<Avatar avatarUrl={userLogin.avatar_url as string} />
						<Link to='/' onClick={logout}>
							Logout
						</Link>
					</li>
				)}
			</ul>
		</nav>
	)
}
