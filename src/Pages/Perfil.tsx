import React, { useState } from "react";
import { Link } from "react-router-dom";
import Publicaciones from "../Objetos/Publicaciones";
import Menu from "../Objetos/Menu";
import Acerca_de_mi from "../Objetos/Acerca_de_Mi";
import Favoritos from "../Objetos/Favoritos";
const Perfil: React.FC = () => {
    const [seccionActiva, setSeccionActiva] = useState("AcercadeMi");
    return (
        <>
            <Menu></Menu>

            <div className="flex mx-40 grid grid-cols-2 items-center pt-26 mb-3">
                <div className="flex">

                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"
                        alt="" className="size-30 rounded-full" />

                    <div className="text-white px-3">
                        <p className="font-bold text-5xl ">Usuario 123</p>
                        <p className="font-semibold text-xl">usuario123@mail.com</p>
                        <p><strong>Seguidores:</strong> 200</p>
                        <p><strong>Siguiendo:</strong> 20</p>
                    </div>

                </div>


                <div className=" mt-2 flex justify-end space-x-3">
                    <Link to="/Editar Perfil" className="p-2 bg-slate-800 rounded  hover:bg-slate-700 font-bold text-white">Editar Perfil</Link>
                    <Link to="/Login" className="p-2 bg-red-500 rounded border-red-100 hover:text-black hover:bg-red-400 font-bold text-white px-8">Salir</Link>

                </div>
            </div>

            <div className="mx-40 space-x-2">
                <button onClick={() => setSeccionActiva("AcercadeMi")}
                    className={`font-bold px-10 p-1 rounded-t text-white hover:bg-gray-400 
               ${seccionActiva === "AcercadeMi" ? "bg-gray-400" : "bg-gray-500"}`}>Acerca de mí</button>

                <button onClick={() => setSeccionActiva("Publicaciones")}
                    className={`font-bold px-10 p-1 rounded-t text-white hover:bg-gray-400 
                    ${seccionActiva === "Publicaciones" ? "bg-gray-400" : "bg-gray-500"}`}>Publicaciones</button>

                <button onClick={() => setSeccionActiva("Favoritos")}
                    className={`font-bold px-10 p-1 rounded-t text-white hover:bg-gray-400 
                    ${seccionActiva === "Favoritos" ? "bg-gray-400" : "bg-gray-500"}`}>Favoritos</button>

            </div>

            <div className="mx-40 bg-gray-400 p-4 rounded-b rounded-e">
                {seccionActiva == "AcercadeMi" && <Acerca_de_mi></Acerca_de_mi>}
                {seccionActiva == "Publicaciones" && <Publicaciones></Publicaciones>}
                {seccionActiva == "Favoritos" && <Favoritos></Favoritos>}
            </div>

            <div className="p-2">

            </div>

        </>
    )
}

export default Perfil;