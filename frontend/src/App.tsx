import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navigationbar from './components/navbar/navbar'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login_page/login'
import WelcomePage from './pages/welcome_page/welcomePage'
import Register from './pages/register_page/register'

function App() {
  return (
    <div>
      <Navigationbar />
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/" element={<WelcomePage/>}/>
        </Routes>
        
      </div>
    </div>
  )
}

export default App
