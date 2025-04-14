import React from "react";
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from "../auth/useauth";


const PrivateRoute: React.FC = () =>{
    const {isLogged} = useAuth();
    return isLogged() ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute;




//Hacer que algunas rutas sean privadas