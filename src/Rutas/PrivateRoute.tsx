// import { Navigate, Outlet } from "react-router-dom";

// interface PrivateRouteProps {
//     isAuthenticated: boolean;
//     redirectPath?: string;
// }

// const PrivateRoute = ({
//     isAuthenticated,
//     redirectPath = '/login',  
// }: PrivateRouteProps) => 
// {
//     if(!isAuthenticated)
//     {
//         return <Navigate to={redirectPath} replace />
//     }

//     return <Outlet />
// }

// export default PrivateRoute;



import React from "react";
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from "../auth/useauth";


const PrivateRoute: React.FC = (props) =>{
    const {isLogged} = useAuth();
    return isLogged() ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute;


//Hacer que algunas rutas sean privadas