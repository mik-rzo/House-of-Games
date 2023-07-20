import { Routes, Route } from 'react-router-dom'
import { Header, Home, SingleReview, Categories, Login } from './views/index.ts'
import './App.css'

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/reviews/:review_id' element={<SingleReview />} />
				<Route path='/categories' element={<Categories />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	)
}

export default App
