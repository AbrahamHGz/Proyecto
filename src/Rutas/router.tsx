import { Route, Routes, Link, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import Menu from '../Objetos/Menu'
import Home from '../Pages/Home'
import Perfil from '../Pages/Perfil'
import Publicacion from '../Pages/Publicacion'
import Login from '../Pages/Login'
import Crear_Publicacion from '../Pages/Crear_Publicacion'
import Singup from '../Pages/Singup'
import Editar_Publicacion from '../Pages/Editar_Publicacion'
import Editar_Perfil from '../Pages/Editar_Perfil'
import Artistas from '../Pages/Artistas'
import Admin from '../Pages/Admin'
import Agrega_Administrador from '../Pages/Agrega_Administrador'
import PruebaDb from '../Pages/PruebaDb'
import PrivateRoute from '../Rutas/PrivateRoute'

const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Login />}>
            {/* Rutas publicas */}
            {/* <Route path='/' element={<Login />}/> */}
            <Route path='/Login' element={<Login />}/>
            <Route path='/SingUp' element={<Singup />}/>
            <Route path='/Perfil' element={<Perfil />}/>
            <Route path='/Editar-Perfil' element={<Editar_Perfil />}/>
            <Route path='/Publicacion' element={<Publicacion />}/>
            <Route index element={<Login />}/>
            <Route path='/Crear-publicacion' element={<Crear_Publicacion/>}/>
            <Route path='/Editar-publicacion' element={<Editar_Publicacion/>}/>
            <Route path='/Artistas' element={<Artistas />}/>
            <Route path='/Administrador' element={<Admin />}/>
            <Route path='/Agrega-Administrador' element={<Agrega_Administrador />}/>
            <Route path='/PruebaDB' element={<PruebaDb />}/>
        
            {/* Rutas privadas */}
            <Route element={<PrivateRoute />}>
               <Route path='/Home' element={<Home />}/>
            </Route>        
        </Route>
      </>
    )
  )
  
  export default router