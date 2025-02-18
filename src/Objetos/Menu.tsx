import React from "react";
import { Link } from "react-router-dom";
const Menu: React.FC = () => {
    return (
        <>
            <div className="bg-slate-950 p-4 fixed w-full">
                <div className="grid grid-cols-3 flex items-center">
                    <div>
                        <Link to="/Home" className="mx-2 text-4xl font-bold text-white">ARTROPOLIS</Link>
                    </div>
                    <form action="" className="">
                        <input type="text" className="
                        bg-gray-200 w-full p-2 rounded" 
                        placeholder="Buscar"/>
                       
                    </form>
                    
                    <div className="flex justify-end text-white">

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