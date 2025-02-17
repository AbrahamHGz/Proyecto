import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes, Link } from 'react-router-dom'

import Home from './Pages/Home'
import Perfil from './Pages/Perfil'

import Menu from './Objetos/Menu'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Home' element={<Home />}/>
        <Route path='/Perfil' element={<Perfil />}/>

        
      </Routes>

    </>
  )
}

export default App
