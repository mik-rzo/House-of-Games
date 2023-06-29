import { Routes, Route } from 'react-router-dom'
import { Header, NavBar, Home, SingleReview, Categories, Login } from './views/index.js'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <NavBar />
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
