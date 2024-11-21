import { useState } from 'react'
import './app.scss'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Admin from './components/Admin'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
        </Routes>
      </Router>

      <Admin/>
    </>
  )
}

export default App
