import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes, Link } from 'react-router-dom'
import Menu from './Objetos/Menu'

import Home from './Pages/Home'
import Perfil from './Pages/Perfil'
import Publicacion from './Pages/Publicacion'
import Login from './Pages/Login'
import Crear_Publicacion from './Pages/Crear_Publicacion'
import Singup from './Pages/Singup'
import Editar_Publicacion from './Pages/Editar_Publicacion'
import Editar_Perfil from './Pages/Editar_Perfil'
import Artistas from './Pages/Artistas'
import Admin from './Pages/Admin'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Home' element={<Home />}/>
        <Route path='/Perfil' element={<Perfil />}/>
        <Route path='/Editar Perfil' element={<Editar_Perfil />}/>
        <Route path='/Publicacion' element={<Publicacion />}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/SingUp' element={<Singup />}/>
        <Route path='/Crear publicacion' element={<Crear_Publicacion/>}/>
        <Route path='/Editar publicacion' element={<Editar_Publicacion/>}/>
        <Route path='/Artistas' element={<Artistas />}/>
        <Route path='/Administrador' element={<Admin />}/>


        
        
      </Routes>


    </>
  )
}

export default App
