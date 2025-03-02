import React, { useState } from "react";
import Menu from "../Objetos/Menu";
import { Link } from "react-router-dom";
import Administradores from "../Objetos/Administradores";
import UsuariosAd from "../Objetos/UsuariosAd";
import Reportes from "../Objetos/Reportes";


const Admin: React.FC = () => {
    const [seccionActiva, setSeccionActiva] = useState("Administradores");
    return(
        <>
            <Menu></Menu>
            
             <div className="flex mx-40 grid grid-cols-2 items-center pt-26 mb-3">
                <div className="flex">

                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"
                        alt="" className="size-30 rounded-full" />

                    <div className="text-white px-3">
                        <p className="font-bold text-5xl ">Usuario 123</p>
                        <p className="font-semibold text-xl">usuario123@mail.com</p>
                    </div>

                </div>


                <div className=" mt-2 flex justify-end space-x-3">
                    <Link to="/Editar Perfil" className="border p-2 hover:bg-slate-700 border-white text-white">Editar Perfil</Link>
                    <Link to="/Login" className="border p-2 hover:bg-red-800 border-red-300 text-white px-8">Salir</Link>

                </div>
            </div>

            <div className="mx-40 space-x-2">
                <button onClick={() => setSeccionActiva("Administradores")}
                    className={`font-bold px-10 p-1 rounded-t text-white hover:bg-gray-400 
               ${seccionActiva === "Administradores" ? "bg-gray-400" : "bg-gray-500"}`}>Administradores</button>

                <button onClick={() => setSeccionActiva("Usuarios")}
                    className={`font-bold px-10 p-1 rounded-t text-white hover:bg-gray-400 
                    ${seccionActiva === "Usuarios" ? "bg-gray-400" : "bg-gray-500"}`}>Usuarios</button>

                <button onClick={() => setSeccionActiva("Reportes")}
                    className={`font-bold px-10 p-1 rounded-t text-white hover:bg-gray-400 
                    ${seccionActiva === "Reportes" ? "bg-gray-400" : "bg-gray-500"}`}>Reportes</button>

            </div>

            <div className="mx-40 bg-gray-400 p-4 rounded-b rounded-e">
                {seccionActiva == "Administradores" && <Administradores></Administradores> }
                {seccionActiva == "Usuarios" && <UsuariosAd></UsuariosAd>}
                {seccionActiva == "Reportes" && <Reportes></Reportes>}
            </div>

            <div className="p-2">

            </div>
        </>
    )
}

export default Admin;