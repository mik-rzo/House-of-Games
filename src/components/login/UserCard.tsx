import { useContext } from 'react'
import { UserContext } from '../../contexts/User.tsx'
import { Avatar } from '../common/Avatar.tsx'
import { isLoggedOut } from '../../utils/isLoggedOut.ts'
import { Link } from 'react-router-dom'
import { UserI } from '../../views/Login.tsx'

import './UserCard.css'

interface UserCardProps {
	user: UserI
}

export function UserCard({ user }: UserCardProps) {
	const { userLogin, setUserLogin } = useContext(UserContext)

	function login() {
		setUserLogin(user)
	}

	return (
		<article>
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
