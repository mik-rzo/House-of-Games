import './MenuButton.css'

interface MenuButtonProps {
  active: boolean
  onPress: React.Dispatch<React.SetStateAction<boolean>>
}

export function MenuButton({active, onPress}: MenuButtonProps) {
  function clickHandler() {
    onPress(!active)
  }
	return (
		<button id='menu-button' className={active ? 'change' : ''} onClick={clickHandler}>
			<div className='bar1'></div>
			<div className='bar2'></div>
			<div className='bar3'></div>
		</button>
	)
}
