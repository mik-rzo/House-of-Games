import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../contexts/User.tsx'
import { isLoggedOut } from '../../utils/isLoggedOut.ts'
import { Avatar } from '../common/Avatar.tsx'

import './NavBar.css'

interface NavBarProps {
	active: boolean
}

export function NavBar({active}: NavBarProps) {
	const { userLogin, setUserLogin } = useContext(UserContext)

	function logout() {
		if (setUserLogin) {
			setUserLogin({})
		}
	}

	return (
		<nav className={active ? '' : 'mobile-hide'}>
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
						<div className='grid-user'>
							<h4 className='username'>{userLogin.username}</h4>
							<Avatar avatarUrl={userLogin.avatar_url as string} />
						</div>
						<Link to='/' onClick={logout}>
							Logout
						</Link>
					</li>
				)}
			</ul>
		</nav>
	)
}
