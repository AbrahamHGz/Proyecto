import React from "react";
import { Link } from "react-router-dom";

const Menu_LogSing:React.FC = () => {
    return (
        <>
            <div className="bg-slate-950 p-4 fixed w-full flex items-center grid grid-cols-2">
                    <div>
                        <h1 className="mx-2 text-4xl font-bold text-white">ARTROPOLIS</h1>
                    </div>
                    <div className="flex text-white space-x-2 justify-end">
                        <Link to="/Login" className="border p-2 hover:bg-slate-700">Iniciar Sesión</Link>
                        <Link to="/Singup" className="border p-2 hover:bg-slate-700">Registrarse</Link>
                    </div>
            </div>
        </>
    )
}

export default Menu_LogSing;