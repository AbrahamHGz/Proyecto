import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
    login: (usuarioInfo: any) => void;
    logout: () => void;
    isLogged: () => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);


function getUsuarioInfo(){
    const usuarioInfo = localStorage.getItem("USUARIO_INFO");
    return usuarioInfo ? JSON.parse(usuarioInfo) : null;
}

const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [user, setUser] = useState(getUsuarioInfo())
    
    const login = (usuarioInfo: any) => {
        setUser(usuarioInfo);
        localStorage.setItem("USUARIO_INFO", JSON.stringify(usuarioInfo));
    }

    const logout = () =>{
        setUser(null);
        localStorage.removeItem("USUARIO_INFO");
    }

    const isLogged = () => !!user;
    return( 
        
        <AuthContext.Provider value={{login, logout, isLogged}} >
            {children}
        </AuthContext.Provider>
        
    )
}

export default AuthProvider;