import React from "react";
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from "../auth/useauth";

const PrivateRouteWithRole: React.FC<{ allowedRoles: string[] }> = ({ allowedRoles }) => {
    const { isLogged, getUserType } = useAuth();

    if (!isLogged()) {
        return <Navigate to="/login" replace />;
    }

    const userRole = getUserType();
    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/Home" replace />; // redirige si el rol no es permitido
    }

    return <Outlet />;
};

export default PrivateRouteWithRole;