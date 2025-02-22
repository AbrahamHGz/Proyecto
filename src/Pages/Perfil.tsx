import React from "react";
import { Link } from "react-router-dom";
import Publicaciones from "../Objetos/Publicaciones";
import Menu from "../Objetos/Menu";
const Perfil: React.FC = () => {
    return (
        <>
            <Menu></Menu>
            
           <div className="flex mx-40 grid grid-cols-2 items-center pt-26 mb-3">
                <div className="flex">

                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"
                    alt="" className="size-30 "/>

                    <div className="text-white px-3">

                    </div>  
                   
                </div>


                <div className=" mt-2 flex justify-end space-x-3">
                    <Link to="" className="border p-2 hover:bg-slate-700 border-white text-white">Editar Perfil</Link>
                    <Link to="/Login" className="border p-2 hover:bg-red-800 border-red-300 text-white px-8">Salir</Link>

                </div>         
           </div>

           <div className="mx-40 space-x-2">
               <button className="bg-gray-400 font-bold px-10 p-1 rounded-t text-white hover:bg-gray-400">Acerca de mí</button>

               <button className="bg-gray-500 font-bold px-10 p-1 rounded-t text-white hover:bg-gray-400">Publicaciones</button>
               <button className="bg-gray-500 font-bold px-10 p-1 rounded-t text-white hover:bg-gray-400">Favoritos</button>
                
           </div>

           <div className="mx-40 bg-gray-400 p-4 rounded-b rounded-e">
                <Publicaciones></Publicaciones>
           </div>

           <div className="p-2">

           </div>

        </>
    )
}

export default Perfil;