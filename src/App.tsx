import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Link, Routes, BrowserRouter, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

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
import Agrega_Administrador from './Pages/Agrega_Administrador'
import PruebaDb from './Pages/PruebaDb'
import Confirmacion from './Pages/Confirmacion'
import Error from './Pages/Error'
import ErrorCategoria from './Pages/ErrorCategoria'
import RecuperarContraseña from './Pages/RecuperarContraseña'

import PrivateRoute from './Rutas/PrivateRoute'
import AuthProvider from './auth/autenticacion'
import PrivateRouteWithRole from './Rutas/PrivateRouteRole'


function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>

    </>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>

        {/* Rutas publicas */}
        <Route path='/' element={<Login />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/SingUp' element={<Singup />} />
        <Route path='/Confirmacion' element={<Confirmacion />} />
        <Route path='/Error' element={<Error />} />
        <Route path='/ErrorCategoria' element={<ErrorCategoria />} />
        <Route path='/RecuperarContraseña' element={<RecuperarContraseña />} />

        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path='/Home' element={<Home />} />
          <Route path='/Editar Perfil/:id' element={<Editar_Perfil />} />
          <Route path='/Publicacion/:id' element={<Publicacion />} />
          <Route path='/Artistas' element={<Artistas />} />
          <Route path='/PruebaDB' element={<PruebaDb />} />
        </Route>
      </Route>

      <Route element={<PrivateRouteWithRole allowedRoles={['admin', 'superadmin']} />}>
        <Route path='/Administrador/:id' element={<Admin />} />
        <Route path='/Agrega Administrador' element={<Agrega_Administrador />} />
      </Route>

      <Route element={<PrivateRouteWithRole allowedRoles={['artista']} />}>
        <Route path='/Crear publicacion' element={<Crear_Publicacion />} />
        <Route path='/Editar publicacion/:id' element={<Editar_Publicacion />} />
        <Route path='/Perfil/:id' element={<Perfil />} />
      </Route>

    </>
  )
)

export default App
