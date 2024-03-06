import { Routes, Route } from 'react-router-dom'
import { Header, Home, Reviews, SingleReview, Categories, Login, Footer } from './views/index.ts'
import './App.css'

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/reviews' element={<Reviews />} />
				<Route path='/reviews/:review_id' element={<SingleReview />} />
				<Route path='/categories' element={<Categories />} />
				<Route path='/login' element={<Login />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App
