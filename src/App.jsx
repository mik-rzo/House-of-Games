import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header, NavBar, Home, Categories, Login } from './components/index.js'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
