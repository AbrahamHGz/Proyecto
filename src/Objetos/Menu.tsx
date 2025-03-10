import React from "react";
import { Link } from "react-router-dom";
const Menu: React.FC = () => {
    return (
        <>
            <div className="bg-slate-950 p-4 fixed w-full z-50">
                <div className="grid grid-cols-3 flex items-center">
                    <div className="flex items-center">
                        <Link to="/Home" className="mx-2 text-4xl font-bold text-white
                       hover:underline
                        ">ARTROPOLIS</Link>

                        <Link to="/Home" className="text-white mx-4 font-bold text-3xl px-4 p-1
                        rounded hover:bg-slate-700">
                            Inicio
                        </Link>
                    </div>
                    <form action="" className="">
                        <input type="text" className="
                        bg-gray-200 w-full p-2 rounded" 
                        placeholder="Buscar"/>
                       
                    </form>
                    
                    <div className="flex justify-end text-white items-center">
                        <Link to="/Artistas" className="text-white mx-4 font-bold text-3xl px-4 p-1
                            rounded hover:bg-slate-700">
                            Artistas
                        </Link>
                        <Link to="/Perfil" className="text-white mx-4 font-bold text-3xl px-4 p-1
                        rounded hover:bg-slate-700">
                            Perfil
                        </Link>
                        <Link to="/Perfil" className=" mx-2 ">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU" 
                            alt="" className="size-16 rounded-full" />
                        </Link>
                    </div>
                </div>

            </div>
        </>        
    )
}

export default Menu;