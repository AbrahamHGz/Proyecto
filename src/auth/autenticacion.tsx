import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
    login: (usuarioInfo: any, token: string) => void;
    logout: () => void;
    isLogged: () => boolean;
    getUserType: () => string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);


function getUsuarioInfo(){
    const usuarioInfo = sessionStorage.getItem("USER_INFO");
    return usuarioInfo ? JSON.parse(usuarioInfo) : null;
}

const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [user, setUser] = useState(getUsuarioInfo())
    
    const login = (usuarioInfo: any, token: string) => {
        setUser(usuarioInfo);
        sessionStorage.setItem("USER_INFO", JSON.stringify(usuarioInfo));
        sessionStorage.setItem("TOKEN", token)
    }

    const logout = () =>{
        setUser(null);
        sessionStorage.removeItem("USER_INFO");
        sessionStorage.removeItem("TOKEN");
    }

    const isLogged = () => {
        const token = sessionStorage.getItem("TOKEN");
        return !!token ;
    }

    const getUserType = () => {
        const userInfo = sessionStorage.getItem("USER_INFO")
        if(!userInfo) return null;
        return JSON.parse(userInfo).tipo
    }
    // const isLogged = () => !!user;
    return( 
        
        <AuthContext.Provider value={{login, logout, isLogged, getUserType}} >
            {children}
        </AuthContext.Provider>
        
    )
}

export default AuthProvider;