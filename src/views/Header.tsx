import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NavBar } from '../components/header/NavBar.tsx'
import { MenuButton } from '../components/header/MenuButton.tsx'
import './Header.css'

export function Header() {
	const [buttonActive, setButtonActive] = useState(false)
	return (
		<header className={buttonActive ? 'active' : ''}>
			<Link id='home-button' to='/'>
				<h1>HOUSE OF GAMES</h1>
			</Link>
			<MenuButton active={buttonActive} onPress={() => setButtonActive(!buttonActive)} />
			<NavBar active={buttonActive} />
		</header>
	)
}
